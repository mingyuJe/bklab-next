import fs from 'fs';
import path from 'path';

export type CMSItem = {
  slug: string;
  title: string;
  date: string;
  category?: string;
  summary?: string;
  image?: string;
  thumbnail?: string;
  cover?: string;
  caption?: string;
  images?: string[];
  featured?: boolean;
  body?: string;
};

const ROOT = process.cwd();

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeSlug(value: string) {
  return safeDecode(String(value || '')).trim();
}

function stripQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseScalar(value: string): string | boolean {
  const stripped = stripQuotes(value);
  if (stripped === 'true') return true;
  if (stripped === 'false') return false;
  return stripped;
}

function parseFrontmatter(source: string) {
  if (!source.startsWith('---')) return { data: {}, body: source };

  const end = source.indexOf('\n---', 3);
  if (end === -1) return { data: {}, body: source };

  const frontmatter = source.slice(3, end).trim();
  const body = source.slice(end + 4).trim();
  const data: Record<string, string | boolean | string[]> = {};
  const lines = frontmatter.split(/\r?\n/);

  let currentListKey: string | null = null;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r/g, '');
    if (!line.trim()) continue;

    const listMatch = line.match(/^\s*-\s*(.+)$/);
    if (currentListKey && listMatch) {
      let value = listMatch[1].trim();

      const objectImage = value.match(/^image:\s*(.+)$/);
      if (objectImage) value = objectImage[1].trim();

      const list = Array.isArray(data[currentListKey])
        ? (data[currentListKey] as string[])
        : [];

      list.push(stripQuotes(value));
      data[currentListKey] = list;
      continue;
    }

    const keyValue = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyValue) continue;

    const key = keyValue[1];
    const value = keyValue[2] ?? '';

    if (value.trim() === '') {
      currentListKey = key;
      data[key] = [];
      continue;
    }

    currentListKey = null;
    data[key] = parseScalar(value);
  }

  return { data, body };
}

function getCollectionDir(collection: 'news' | 'gallery') {
  return path.join(ROOT, 'content', collection);
}

function getMarkdownFiles(collection: 'news' | 'gallery') {
  const dir = getCollectionDir(collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .map((name) => path.join(dir, name));
}

function normalizePublicPath(value?: string) {
  if (!value) return '';
  const trimmed = String(value).trim();
  if (!trimmed) return '';

  if (trimmed.startsWith('/')) return trimmed;
  if (trimmed.startsWith('public/')) return trimmed.replace(/^public/, '');
  return `/${trimmed}`;
}

function readCollection(collection: 'news' | 'gallery'): CMSItem[] {
  return getMarkdownFiles(collection)
    .map((file) => {
      const raw = fs.readFileSync(file, 'utf-8');
      const { data, body } = parseFrontmatter(raw);
      const slug = path.basename(file).replace(/\.mdx?$/, '');

      const image = normalizePublicPath(typeof data.image === 'string' ? data.image : '');
      const thumbnail = normalizePublicPath(
        typeof data.thumbnail === 'string' ? data.thumbnail : ''
      );
      const cover = normalizePublicPath(typeof data.cover === 'string' ? data.cover : '');

      return {
        slug,
        title: String(data.title || slug),
        date: String(data.date || ''),
        category: typeof data.category === 'string' ? data.category : '',
        summary: typeof data.summary === 'string' ? data.summary : '',
        image,
        thumbnail: thumbnail || image || cover,
        cover: cover || image || thumbnail,
        caption: typeof data.caption === 'string' ? data.caption : '',
        images: Array.isArray(data.images) ? data.images.map(normalizePublicPath) : [],
        featured: data.featured === true,
        body,
      };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export function getNewsItems() {
  return readCollection('news');
}

export function getNewsItem(slug: string) {
  const target = normalizeSlug(slug);
  return getNewsItems().find((item) => normalizeSlug(item.slug) === target);
}

export function getGalleryItems() {
  return readCollection('gallery');
}

export function getGalleryItem(slug: string) {
  const target = normalizeSlug(slug);
  return getGalleryItems().find((item) => normalizeSlug(item.slug) === target);
}

export function formatDate(date?: string) {
  if (!date) return '';
  return String(date).slice(0, 10);
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function inlineMarkdown(input: string) {
  return input
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(
      /\[(.+?)\]\((https?:\/\/.+?)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
    );
}

export function markdownToHtml(markdown = '') {
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let listOpen = false;

  const closeList = () => {
    if (listOpen) {
      html.push('</ul>');
      listOpen = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      continue;
    }

    const image = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (image) {
      closeList();
      html.push(
        `<figure><img src="${escapeHtml(image[2])}" alt="${escapeHtml(
          image[1]
        )}" /><figcaption>${escapeHtml(image[1])}</figcaption></figure>`
      );
      continue;
    }

    if (line.startsWith('### ')) {
      closeList();
      html.push(`<h3>${inlineMarkdown(escapeHtml(line.slice(4)))}</h3>`);
      continue;
    }

    if (line.startsWith('## ')) {
      closeList();
      html.push(`<h2>${inlineMarkdown(escapeHtml(line.slice(3)))}</h2>`);
      continue;
    }

    if (line.startsWith('# ')) {
      closeList();
      html.push(`<h1>${inlineMarkdown(escapeHtml(line.slice(2)))}</h1>`);
      continue;
    }

    if (line.startsWith('- ')) {
      if (!listOpen) {
        html.push('<ul>');
        listOpen = true;
      }

      html.push(`<li>${inlineMarkdown(escapeHtml(line.slice(2)))}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${inlineMarkdown(escapeHtml(line))}</p>`);
  }

  closeList();
  return html.join('\n');
}
