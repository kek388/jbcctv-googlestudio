import express from 'express';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '14bb9b6b2f2587c22d9181b40eaddc8be70bffcee55a0ad61459237f3af8978e';
const SESSION_SECRET = process.env.SESSION_SECRET;
const DATA_DIR = path.join(__dirname, 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const PROJECTS_SEED_FILES = [
  path.join(__dirname, 'dist', 'projects.json'),
  path.join(__dirname, 'public', 'projects.json')
];
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads', 'projects');

app.use(express.json({ limit: '20mb' }));

let projectWriteQueue = Promise.resolve();
const readProjects = async () => {
  try {
    return JSON.parse(await fs.readFile(PROJECTS_FILE, 'utf8'));
  } catch (error) {
    if (error?.code === 'ENOENT') {
      for (const seedFile of PROJECTS_SEED_FILES) {
        try {
          const projects = JSON.parse(await fs.readFile(seedFile, 'utf8'));
          await writeProjects(projects);
          return projects;
        } catch (seedError) {
          if (seedError?.code !== 'ENOENT') throw seedError;
        }
      }
      return [];
    }
    throw error;
  }
};
const writeProjects = async (projects) => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tempFile = `${PROJECTS_FILE}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(projects, null, 2));
  await fs.rename(tempFile, PROJECTS_FILE);
};
const queueProjectWrite = (operation) => {
  projectWriteQueue = projectWriteQueue.then(operation, operation);
  return projectWriteQueue;
};

const encode = (value) => Buffer.from(value).toString('base64url');
const sign = (value) => crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('base64url');
const getCookies = (req) => Object.fromEntries(
  (req.headers.cookie || '').split(';').filter(Boolean).map((part) => {
    const [name, ...rest] = part.trim().split('=');
    return [name, decodeURIComponent(rest.join('='))];
  })
);
const hasValidAdminSession = (req) => {
  if (!SESSION_SECRET) return false;
  const token = getCookies(req).jb_admin_session;
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = sign(payload);
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data.role === 'admin' && Number(data.exp) > Date.now();
  } catch {
    return false;
  }
};

app.get('/api/admin/session', (req, res) => res.json({ authenticated: hasValidAdminSession(req) }));
app.post('/api/admin/session', (req, res) => {
  if (!SESSION_SECRET) return res.status(503).json({ error: 'Admin session is not configured.' });
  const suppliedHash = crypto.createHash('sha256').update(String(req.body?.password || '')).digest('hex');
  if (suppliedHash.length !== ADMIN_PASSWORD_HASH.length || !crypto.timingSafeEqual(Buffer.from(suppliedHash), Buffer.from(ADMIN_PASSWORD_HASH))) {
    return res.status(401).json({ error: 'Incorrect administrator authorization password.' });
  }
  const payload = encode(JSON.stringify({ role: 'admin', exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 }));
  res.cookie('jb_admin_session', `${payload}.${sign(payload)}`, {
    httpOnly: true, secure: true, sameSite: 'strict', maxAge: SESSION_MAX_AGE_SECONDS * 1000, path: '/'
  });
  res.json({ authenticated: true });
});
app.delete('/api/admin/session', (req, res) => {
  res.clearCookie('jb_admin_session', { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });
  res.status(204).end();
});

app.get('/api/projects', async (_req, res) => {
  try {
    res.json(await readProjects());
  } catch (error) {
    console.error('Unable to read projects:', error);
    res.status(500).json({ error: 'Unable to load project portfolio.' });
  }
});

app.post('/api/projects', async (req, res) => {
  if (!hasValidAdminSession(req)) return res.status(401).json({ error: 'Administrator authorization required.' });

  const input = req.body || {};
  const required = ['title', 'category', 'projectType', 'productType', 'location', 'description'];
  if (required.some((field) => typeof input[field] !== 'string' || !input[field].trim())) {
    return res.status(400).json({ error: 'Project details are incomplete.' });
  }
  if (!Array.isArray(input.images) || input.images.length < 1 || input.images.length > 5) {
    return res.status(400).json({ error: 'Add between one and five project images.' });
  }

  try {
    const project = await queueProjectWrite(async () => {
      const id = `proj-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
      const projectUploadDir = path.join(UPLOADS_DIR, id);
      await fs.mkdir(projectUploadDir, { recursive: true });

      const imageUrls = [];
      for (let index = 0; index < input.images.length; index += 1) {
        const image = input.images[index];
        const match = typeof image === 'string' && image.match(/^data:image\/(jpeg|jpg|png|webp);base64,(.+)$/s);
        if (match) {
          const extension = match[1] === 'jpeg' ? 'jpg' : match[1];
          const bytes = Buffer.from(match[2], 'base64');
          if (bytes.length > 4 * 1024 * 1024) throw new Error('IMAGE_TOO_LARGE');
          const filename = `${index + 1}.${extension}`;
          await fs.writeFile(path.join(projectUploadDir, filename), bytes);
          imageUrls.push(`/uploads/projects/${id}/${filename}`);
        } else if (typeof image === 'string' && (image.startsWith('https://') || image.startsWith('/uploads/'))) {
          imageUrls.push(image);
        } else {
          throw new Error('INVALID_IMAGE');
        }
      }

      const newProject = {
        id,
        title: input.title.trim(),
        category: input.category,
        projectType: input.projectType,
        productType: input.productType.trim(),
        location: input.location.trim(),
        image: imageUrls[0],
        images: imageUrls,
        description: input.description.trim(),
        completionDate: input.completionDate || new Date().toISOString().slice(0, 10)
      };
      const projects = await readProjects();
      await writeProjects([newProject, ...projects]);
      return newProject;
    });
    res.status(201).json(project);
  } catch (error) {
    console.error('Unable to save project:', error);
    const message = error?.message === 'IMAGE_TOO_LARGE' ? 'Each image must be under 4 MB.' : 'Unable to save this project.';
    res.status(400).json({ error: message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  if (!hasValidAdminSession(req)) return res.status(401).json({ error: 'Administrator authorization required.' });
  try {
    const removed = await queueProjectWrite(async () => {
      const projects = await readProjects();
      const next = projects.filter((project) => project.id !== req.params.id);
      if (next.length === projects.length) return false;
      await writeProjects(next);
      await fs.rm(path.join(UPLOADS_DIR, req.params.id), { recursive: true, force: true });
      return true;
    });
    if (!removed) return res.status(404).json({ error: 'Project not found.' });
    res.status(204).end();
  } catch (error) {
    console.error('Unable to delete project:', error);
    res.status(500).json({ error: 'Unable to delete this project.' });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads'), { maxAge: '30d' }));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
