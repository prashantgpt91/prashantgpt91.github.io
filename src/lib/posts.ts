import matter from 'gray-matter';
import { Post } from '@/data/blogData';

/**
 * Get all blog posts from the markdown files.
 */
export async function getAllPosts(): Promise<Post[]> {
  // Vite's glob import to get all markdown files as raw text
  const postFiles = import.meta.glob('/src/data/posts/*.md', { as: 'raw' });

  const postPromises = Object.entries(postFiles).map(async ([path, rawContentFetcher]) => {
    const rawContent = await rawContentFetcher();
    const { data, content } = matter(rawContent);
    const slug = path.split('/').pop()?.replace('.md', '');

    if (!slug) {
      return null;
    }

    // The data from frontmatter is cast to the Post type (without content and slug)
    return {
      ...(data as Omit<Post, 'content' | 'slug'>),
      slug,
      content,
    } as Post;
  });

  const posts = (await Promise.all(postPromises)).filter((p): p is Post => p !== null);

  // Sort posts by date in descending order
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by its slug.
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    // Dynamically import the specific markdown file as raw text
    // The /* @vite-ignore */ comment is used to prevent Vite from throwing an error
    // on what it perceives as a fully dynamic import.
    const postModule = await import(/* @vite-ignore */ `/src/data/posts/${slug}.md?raw`);
    const rawContent = postModule.default;
    
    const { data, content } = matter(rawContent);

    return {
      ...(data as Omit<Post, 'content' | 'slug'>),
      slug,
      content,
    } as Post;
  } catch (e) {
    console.error(`Error fetching post with slug "${slug}":`, e);
    return undefined;
  }
}
