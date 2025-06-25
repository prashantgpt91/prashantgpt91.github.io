import { Paper, parseMarkdown, sortByYear } from '@/utils/markdownUtils';

// Automatically import all markdown files from the papers directory - using eager loading
const markdownModules = import.meta.glob('./papers/*.md', { query: '?raw', import: 'default', eager: true });

// Load all papers
export async function loadPapers(): Promise<Paper[]> {
  const papers: Paper[] = [];
  
  Object.entries(markdownModules).forEach(([path, content]) => {
    try {
      // Extract filename from path (e.g., './papers/my-paper.md' -> 'my-paper')
      const filename = (path as string).replace('./papers/', '').replace('.md', '');
      const paper = parseMarkdown<Paper>(content as string, filename);
      papers.push(paper);
    } catch (error) {
      console.error(`Error loading paper ${path}:`, error);
    }
  });
  
  return sortByYear(papers);
}

// Get a single paper by slug
export async function getPaper(slug: string): Promise<Paper | null> {
  const papers = await loadPapers();
  return papers.find(paper => paper.slug === slug) || null;
}

// Get papers by year
export async function getPapersByYear(year: number): Promise<Paper[]> {
  const papers = await loadPapers();
  return papers.filter(paper => paper.year === year);
}

// Get papers by category
export async function getPapersByCategory(category: string): Promise<Paper[]> {
  const papers = await loadPapers();
  return papers.filter(paper => 
    paper.category.toLowerCase() === category.toLowerCase()
  );
}

// Get all paper categories
export async function getPaperCategories(): Promise<string[]> {
  const papers = await loadPapers();
  const categorySet = new Set<string>();
  
  papers.forEach(paper => {
    categorySet.add(paper.category);
  });
  
  return Array.from(categorySet).sort();
}

// Get all paper years
export async function getPaperYears(): Promise<number[]> {
  const papers = await loadPapers();
  const yearSet = new Set<number>();
  
  papers.forEach(paper => {
    yearSet.add(paper.year);
  });
  
  return Array.from(yearSet).sort((a, b) => b - a);
}

// Get featured papers
export async function getFeaturedPapers(): Promise<Paper[]> {
  const papers = await loadPapers();
  return papers.filter(paper => paper.featured);
}

// Get top cited papers
export async function getTopCitedPapers(limit: number = 10): Promise<Paper[]> {
  const papers = await loadPapers();
  return papers
    .filter(paper => paper.citations && paper.citations > 0)
    .sort((a, b) => (b.citations || 0) - (a.citations || 0))
    .slice(0, limit);
}
