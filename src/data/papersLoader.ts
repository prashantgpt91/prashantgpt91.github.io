import { Paper, parseMarkdown, sortByDate } from '@/utils/markdownUtils';
import { paginateArray, PaginationResult, PAGINATION_SIZES } from '@/utils/paginationUtils';

// Automatically import all markdown files from the papers directory - using eager loading
const markdownModules = import.meta.glob('./papers/*.md', { query: '?raw', import: 'default', eager: true });

// Cache for performance
let cachedPapers: Paper[] | null = null;
let cachedSummaries: Omit<Paper, 'content'>[] | null = null;

// Load all papers (with content) - used only for individual paper pages
export async function loadPapers(): Promise<Paper[]> {
  if (cachedPapers) return cachedPapers;
  
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
  
  cachedPapers = papers.sort((a, b) => b.year - a.year);
  return cachedPapers;
}

// Load only metadata for listing pages (performance optimization)
export async function loadPaperSummaries(): Promise<Omit<Paper, 'content'>[]> {
  if (cachedSummaries) return cachedSummaries;
  
  const summaries: Omit<Paper, 'content'>[] = [];
  
  Object.entries(markdownModules).forEach(([path, content]) => {
    try {
      const filename = (path as string).replace('./papers/', '').replace('.md', '');
      const paper = parseMarkdown<Paper>(content as string, filename);
      
      // Remove content for better performance on listing pages
      const { content: _, ...summary } = paper;
      summaries.push(summary);
    } catch (error) {
      console.error(`Error loading paper summary ${path}:`, error);
    }
  });
  
  cachedSummaries = (summaries as Paper[]).sort((a, b) => b.year - a.year)
    .map(({ content, ...summary }) => summary);
  return cachedSummaries;
}

// Paginated papers for listing pages
export async function getPaginatedPapers(
  page: number = 1,
  itemsPerPage: number = PAGINATION_SIZES.SMALL,
  category?: string,
  status?: string,
  searchTerm?: string
): Promise<PaginationResult<Omit<Paper, 'content'>>> {
  let papers = await loadPaperSummaries();
  
  // Filter by category if provided
  if (category && category !== 'all') {
    papers = papers.filter(paper => paper.category?.toLowerCase() === category.toLowerCase());
  }
  
  // Filter by status if provided (published/draft/under-review)
  if (status && status !== 'all') {
    papers = papers.filter(paper => paper.status?.toLowerCase() === status.toLowerCase());
  }
  
  // Filter by search term if provided
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    papers = papers.filter(paper => 
      paper.title.toLowerCase().includes(term) ||
      paper.abstract?.toLowerCase().includes(term) ||
      paper.keywords?.some(keyword => keyword.toLowerCase().includes(term)) ||
      paper.journal?.toLowerCase().includes(term)
    );
  }
  
  return paginateArray(papers, page, itemsPerPage);
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
