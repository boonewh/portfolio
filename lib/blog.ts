import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

function publishedFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.mdx'))
    .map(entry => entry.name);
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
}

export function getAllPosts(): PostMeta[] {
  return publishedFiles()
    .map((filename) => {
      const slug = filename.replace('.mdx', '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
      const { data } = matter(raw);
      return { slug, ...data } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  // Route input may select only a published, regular file inside the blog directory.
  if (typeof slug !== 'string' || !publishedFiles().includes(`${slug}.mdx`)) {
    throw new Error('Post not found');
  }
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  return { meta: { slug, ...data } as PostMeta, content };
}
