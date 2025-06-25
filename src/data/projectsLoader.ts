import { Project, parseMarkdown, sortByDate } from '@/utils/markdownUtils';
import { paginateArray, PaginationResult, PAGINATION_SIZES } from '@/utils/paginationUtils';

// Automatically import all markdown files from the projects directory - using eager loading
const markdownModules = import.meta.glob('./projects/*.md', { query: '?raw', import: 'default', eager: true });

// Cache for performance
let cachedProjects: Project[] | null = null;
let cachedSummaries: Omit<Project, 'content'>[] | null = null;

// Load all projects (with content) - used only for individual project pages
export async function loadProjects(): Promise<Project[]> {
  if (cachedProjects) return cachedProjects;
  
  const projects: Project[] = [];
  
  Object.entries(markdownModules).forEach(([path, content]) => {
    try {
      // Extract filename from path (e.g., './projects/my-project.md' -> 'my-project')
      const filename = (path as string).replace('./projects/', '').replace('.md', '');
      const project = parseMarkdown<Project>(content as string, filename);
      projects.push(project);
    } catch (error) {
      console.error(`Error loading project ${path}:`, error);
    }
  });
  
  cachedProjects = projects.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  return cachedProjects;
}

// Load only metadata for listing pages (performance optimization)
export async function loadProjectSummaries(): Promise<Omit<Project, 'content'>[]> {
  if (cachedSummaries) return cachedSummaries;
  
  const summaries: Omit<Project, 'content'>[] = [];
  
  Object.entries(markdownModules).forEach(([path, content]) => {
    try {
      const filename = (path as string).replace('./projects/', '').replace('.md', '');
      const project = parseMarkdown<Project>(content as string, filename);
      
      // Remove content for better performance on listing pages
      const { content: _, ...summary } = project;
      summaries.push(summary);
    } catch (error) {
      console.error(`Error loading project summary ${path}:`, error);
    }
  });
  
  cachedSummaries = (summaries as Project[]).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .map(({ content, ...summary }) => summary);
  return cachedSummaries;
}

// Paginated projects for listing pages
export async function getPaginatedProjects(
  page: number = 1,
  itemsPerPage: number = PAGINATION_SIZES.SMALL,
  category?: string,
  status?: string,
  searchTerm?: string
): Promise<PaginationResult<Omit<Project, 'content'>>> {
  let projects = await loadProjectSummaries();
  
  // Filter by category if provided
  if (category && category !== 'all') {
    projects = projects.filter(project => project.category?.toLowerCase() === category.toLowerCase());
  }
  
  // Filter by status if provided
  if (status && status !== 'all') {
    projects = projects.filter(project => project.status?.toLowerCase() === status.toLowerCase());
  }
  
  // Filter by search term if provided
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    projects = projects.filter(project => 
      project.title.toLowerCase().includes(term) ||
      project.description?.toLowerCase().includes(term) ||
      project.technologies?.some(tech => tech.toLowerCase().includes(term))
    );
  }
  
  return paginateArray(projects, page, itemsPerPage);
}

// Get a single project by slug
export async function getProject(slug: string): Promise<Project | null> {
  const projects = await loadProjects();
  return projects.find(project => project.slug === slug) || null;
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await loadProjects();
  return projects.filter(project => project.featured);
}

// Get projects by technology
export async function getProjectsByTechnology(technology: string): Promise<Project[]> {
  const projects = await loadProjects();
  return projects.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
}

// Get all technologies
export async function getAllTechnologies(): Promise<string[]> {
  const projects = await loadProjects();
  const techSet = new Set<string>();
  
  projects.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  
  return Array.from(techSet).sort();
}

// Get all project categories
export async function getProjectCategories(): Promise<string[]> {
  const projects = await loadProjects();
  const categorySet = new Set<string>();
  
  projects.forEach(project => {
    categorySet.add(project.category);
  });
  
  return Array.from(categorySet).sort();
}
