import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const DATA_DIR = path.join(process.cwd(), 'data');

// ============ Members ============
export type Member = {
  id: string;
  name_en: string;
  name_kr: string;
  title?: string;
  role: string;
  subtitle?: string;
  office?: string;
  email?: string;
  focus?: string;
  initials: string;
  photo?: string;
};

export type MembersData = {
  pi: Member[];
  phd: Member[];
  ms: Member[];
  undergrad: Member[];
  alumni: Member[];
};

export function getMembers(): MembersData {
  const file = path.join(DATA_DIR, 'members.json');
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

// ============ Facilities ============
export type EquipmentSpec = { label: string; value: string };
export type Equipment = {
  id: string;
  name: string;
  model: string;
  tag: string;
  icon: string;
  specs: EquipmentSpec[];
  photo?: string;
};
export type FacilityCategory = {
  title: string;
  items: Equipment[];
};
export type FacilitiesData = {
  ceramic: FacilityCategory;
  thinfilm: FacilityCategory;
  character: FacilityCategory;
};

export function getFacilities(): FacilitiesData {
  const file = path.join(DATA_DIR, 'facilities.json');
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

// ============ Research ============
export type ResearchOverview = {
  title_en: string;
  title_kr: string;
  lead: string;
};

export type ResearchTopic = {
  id: string;
  number: string;
  visual: 'oxide' | 'thermoelectric' | 'ferroelectric';
  tag: string;
  tagColor: 'blue' | 'green' | 'amber' | 'violet';
  title: string;
  title_kr?: string;
  summary: string;
  description: string;
  keywords: string[];
  image?: string;
};

export type ResearchHighlight = {
  id: string;
  title: string;
  venue: string;
  year: number;
  image?: string;
  summary: string;
};

export type ResearchData = {
  overview: ResearchOverview;
  topics: ResearchTopic[];
  highlights: ResearchHighlight[];
};

export function getResearch(): ResearchData {
  const file = path.join(DATA_DIR, 'research.json');
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

// ============ Publications ============
export type Publication = {
  id: number | string;
  year: number;
  pi?: string[];

  title: string;
  authors?: string;

  venue?: string;
  journal?: string;
  details?: string;
  volume?: string;
  pages?: string;
  doi?: string;

  notes?: string[];
  featured?: boolean;

  indexByPi?: {
    Baek?: number;
    Kim?: number;
  };

  sourceIds?: {
    Baek?: number;
    Kim?: number;
  };
};

export function getPublications(): Publication[] {
  const file = path.join(DATA_DIR, 'publications.json');
  const raw = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const all: Publication[] = Array.isArray(raw) ? raw : raw.publications || [];
  
  return all.sort((a, b) => {
  const aId = Number(a.id) || 0;
  const bId = Number(b.id) || 0;
  return bId - aId;
});
}

export function getFeaturedPublications(limit = 5): Publication[] {
  return getPublications().filter((p) => p.featured).slice(0, limit);
}


// ============ Patents ============
export type Patent = {
  id?: string;
  year?: number | string;
  title: string;
  inventors?: string;
  applicationNumber?: string;
  registrationNumber?: string;
  country?: string;
  status?: string;
  pi?: string[];
  description?: string;
};

export function getPatents(): Patent[] {
  const file = path.join(DATA_DIR, 'patents.json');
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, 'utf-8'));
  return Array.isArray(raw) ? raw : raw.patents || [];
}

// ============ Gallery ============
export type GalleryItem = {
  id: string;
  title: string;
  category?: string;
  date?: string;
  image?: string;
  caption?: string;
};

export function getGallery(): GalleryItem[] {
  const file = path.join(DATA_DIR, 'gallery.json');
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, 'utf-8'));
  return Array.isArray(raw) ? raw : raw.gallery || [];
}

// ============ Research Data ============
export type ResearchDataItem = {
  title: string;
  description?: string;
  url?: string;
  type?: string;
};

export function getResearchData(): ResearchDataItem[] {
  const file = path.join(DATA_DIR, 'research-data.json');
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, 'utf-8'));
  return Array.isArray(raw) ? raw : raw.items || [];
}

// ============ Websites ============
export type WebsiteLink = {
  title: string;
  description?: string;
  url: string;
  category?: string;
};

export function getWebsites(): WebsiteLink[] {
  const file = path.join(DATA_DIR, 'websites.json');
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, 'utf-8'));
  return Array.isArray(raw) ? raw : raw.links || [];
}

// Re-export client-safe utilities for server components
export { renderAuthors, formatDate } from './format';

// ============ News ============
export type NewsItem = {
  slug: string;
  date: string;
  title: string;
  category?: string;
  image?: string;
  body: string;
};

export function getNews(): NewsItem[] {
  const dir = path.join(CONTENT_DIR, 'news');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  const items = files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/, '');
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug,
      date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date || ''),
      title: data.title || slug,
      category: data.category || '',
      image: data.image || '',
      body: content.trim(),
    } as NewsItem;
  });
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRecentNews(limit = 3): NewsItem[] {
  return getNews().slice(0, limit);
}

// Simple markdown → HTML for news body (very lightweight; we use it inline)
export function mdToHtml(md: string): string {
  // bold
  let html = md.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // italic
  html = html.replace(/(^|\s)\*(.+?)\*/g, '$1<em>$2</em>');
  // paragraphs
  return html
    .split(/\n\n+/)
    .map((p) => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
    .join('\n');
}
