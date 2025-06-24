import matter from 'gray-matter';

export interface Paper {
  id: number;
  title: string;
  authors: string;
  description: string;
  year: string;
  venue: string;
  category: string;
  tags: string[];
  url: string;
}

export async function getAllPapers(): Promise<Paper[]> {
  const paperFiles = import.meta.glob('/src/data/papers/*.md', { as: 'raw' });
  const papers = await Promise.all(
    Object.entries(paperFiles).map(async ([, loader]) => {
      const fileContent = await loader();
      const { data } = matter(fileContent);
      return data as Paper;
    })
  );
  return papers.sort((a, b) => b.year.localeCompare(a.year) || a.id - b.id);
}
