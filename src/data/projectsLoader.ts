import { Project, parseMarkdown, sortByDate } from '@/utils/markdownUtils';

// Automatically import all markdown files from the projects directory - using eager loading
const markdownModules = import.meta.glob('./projects/*.md', { query: '?raw', import: 'default', eager: true });

// Load all projects
export async function loadProjects(): Promise<Project[]> {
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
  
  return projects.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
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
