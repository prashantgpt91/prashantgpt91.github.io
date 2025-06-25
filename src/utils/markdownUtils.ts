import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: string;
  readTime: string;
  author: string;
  slug: string;
  content: string;
  featured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: string;
  startDate: string;
  endDate?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  slug: string;
  content: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  pages?: string;
  doi?: string;
  arxivUrl?: string;
  pdfUrl?: string;
  abstract: string;
  keywords: string[];
  category: string;
  status: string;
  citations?: number;
  featured?: boolean;
  slug: string;
  content: string;
}

// Function to parse markdown files and extract frontmatter
export function parseMarkdown<T>(markdownContent: string, id: string): T {
  const { data, content } = matter(markdownContent);
  
  return {
    id,
    ...data,
    content,
  } as T;
}

// Function to generate a unique ID from filename
export function generateId(filename: string): string {
  return filename.replace(/\.md$/, '');
}

// Sort functions
export function sortByDate<T extends { date: string }>(items: T[]): T[] {
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function sortByYear<T extends { year: number }>(items: T[]): T[] {
  return items.sort((a, b) => b.year - a.year);
}

// Filter functions
export function filterByTag<T extends { tags: string[] }>(items: T[], tag: string): T[] {
  if (tag === 'all') return items;
  return items.filter(item => item.tags.includes(tag));
}

export function filterByCategory<T extends { category: string }>(items: T[], category: string): T[] {
  if (category === 'all') return items;
  return items.filter(item => item.category === category);
}

export function filterByStatus<T extends { status: string }>(items: T[], status: string): T[] {
  if (status === 'all') return items;
  return items.filter(item => item.status === status);
}

// Search function
export function searchItems<T extends { title: string; content?: string }>(
  items: T[], 
  searchTerm: string
): T[] {
  if (!searchTerm) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    item.title.toLowerCase().includes(term) ||
    (item.content && item.content.toLowerCase().includes(term))
  );
}
