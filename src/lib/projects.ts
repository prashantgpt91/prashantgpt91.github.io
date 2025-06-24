import matter from 'gray-matter';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  businessImpact: string;
  role: string;
  category: string;
}

export async function getAllProjects(): Promise<Project[]> {
  const projectFiles = import.meta.glob('/src/data/projects/*.md', { as: 'raw' });
  const projects = await Promise.all(
    Object.entries(projectFiles).map(async ([, loader]) => {
      const fileContent = await loader();
      const { data } = matter(fileContent);
      return data as Project;
    })
  );
  return projects.sort((a, b) => a.id - b.id);
}
