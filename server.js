import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '14bb9b6b2f2587c22d9181b40eaddc8be70bffcee55a0ad61459237f3af8978e';
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(express.json({ limit: '16kb' }));

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

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
