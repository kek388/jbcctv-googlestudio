type MetaPixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

export type Attribution = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  fbclid: string;
  landingPage: string;
};

const ATTRIBUTION_KEY = 'jb_cctv_first_touch_attribution';

const readParam = (params: URLSearchParams, name: string, fallback = '') =>
  params.get(name)?.trim() || fallback;

export const captureAttribution = (): Attribution => {
  if (typeof window === 'undefined') {
    return { source: 'direct', medium: '', campaign: '', content: '', term: '', fbclid: '', landingPage: '' };
  }
  const existing = window.localStorage.getItem(ATTRIBUTION_KEY);
  if (existing) {
    try { return JSON.parse(existing) as Attribution; }
    catch { window.localStorage.removeItem(ATTRIBUTION_KEY); }
  }
  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    source: readParam(params, 'utm_source', document.referrer ? 'referral' : 'direct'),
    medium: readParam(params, 'utm_medium'),
    campaign: readParam(params, 'utm_campaign'),
    content: readParam(params, 'utm_content'),
    term: readParam(params, 'utm_term'),
    fbclid: readParam(params, 'fbclid'),
    landingPage: `${window.location.pathname}${window.location.search}`,
  };
  window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  return attribution;
};

export const attributionMessage = () => {
  const a = captureAttribution();
  return `\n\n--- Enquiry source ---\nSource: ${a.source || 'direct'}\nCampaign: ${a.campaign || 'none'}\nAd: ${a.content || 'none'}`;
};

export const trackMetaEvent = (eventName: string, parameters: Record<string, string | number | boolean> = {}, custom = false) => {
  if (typeof window === 'undefined' || !window.fbq) return;
  const a = captureAttribution();
  window.fbq(custom ? 'trackCustom' : 'track', eventName, {
    ...parameters, source: a.source, campaign: a.campaign, ad_content: a.content,
  });
};

export const initMetaPixel = () => {
  if (typeof window === 'undefined') return;
  captureAttribution();
  const pixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();
  if (!pixelId || window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as MetaPixelFunction;
  fbq.push = (...args: unknown[]) => fbq.queue.push(args);
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');

  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="wa.me/"]');
    if (!link) return;
    trackMetaEvent('Contact', {
      content_name: link.dataset.metaContentName || 'Website WhatsApp Link',
      content_category: link.dataset.metaContentCategory || 'Website Enquiry',
      contact_method: 'WhatsApp',
    });
  });
};

