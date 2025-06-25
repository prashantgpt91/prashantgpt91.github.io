import { BlogPost, parseMarkdown, sortByDate } from '@/utils/markdownUtils';

// Automatically import all markdown files from the blog directory - using eager loading
const markdownModules = import.meta.glob('./blog/*.md', { query: '?raw', import: 'default', eager: true });

// Load all blog posts
export async function loadBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  Object.entries(markdownModules).forEach(([path, content]) => {
    try {
      // Extract filename from path (e.g., './blog/my-post.md' -> 'my-post')
      const filename = (path as string).replace('./blog/', '').replace('.md', '');
      const post = parseMarkdown<BlogPost>(content as string, filename);
      posts.push(post);
    } catch (error) {
      console.error(`Error loading blog post ${path}:`, error);
    }
  });
  
  return sortByDate(posts);
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await loadBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get all blog post tags
export async function getBlogTags(): Promise<string[]> {
  const posts = await loadBlogPosts();
  const tagSet = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

// Get all blog post categories
export async function getBlogCategories(): Promise<string[]> {
  const posts = await loadBlogPosts();
  const categorySet = new Set<string>();
  
  posts.forEach(post => {
    categorySet.add(post.category);
  });
  
  return Array.from(categorySet).sort();
}
