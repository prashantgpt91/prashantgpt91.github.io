import { BlogPost, parseMarkdown, sortByDate } from '@/utils/markdownUtils';
import { paginateArray, PaginationResult, PAGINATION_SIZES } from '@/utils/paginationUtils';

// Automatically import all markdown files from the blog directory - using eager loading
const markdownModules = import.meta.glob('./blog/*.md', { query: '?raw', import: 'default', eager: true });

// Cache for performance
let cachedPosts: BlogPost[] | null = null;
let cachedSummaries: Omit<BlogPost, 'content'>[] | null = null;

// Load all blog posts (with content) - used only for individual post pages
export async function loadBlogPosts(): Promise<BlogPost[]> {
  if (cachedPosts) return cachedPosts;
  
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
  
  cachedPosts = sortByDate(posts);
  return cachedPosts;
}

// Load only metadata for listing pages (performance optimization)
export async function loadBlogSummaries(): Promise<Omit<BlogPost, 'content'>[]> {
  if (cachedSummaries) return cachedSummaries;
  
  const summaries: Omit<BlogPost, 'content'>[] = [];
  
  Object.entries(markdownModules).forEach(([path, content]) => {
    try {
      const filename = (path as string).replace('./blog/', '').replace('.md', '');
      const post = parseMarkdown<BlogPost>(content as string, filename);
      
      // Remove content for better performance on listing pages
      const { content: _, ...summary } = post;
      summaries.push(summary);
    } catch (error) {
      console.error(`Error loading blog summary ${path}:`, error);
    }
  });
  
  cachedSummaries = sortByDate(summaries as BlogPost[]).map(({ content, ...summary }) => summary);
  return cachedSummaries;
}

// Paginated blog posts for listing pages
export async function getPaginatedBlogPosts(
  page: number = 1,
  itemsPerPage: number = PAGINATION_SIZES.MEDIUM,
  category?: string,
  searchTerm?: string
): Promise<PaginationResult<Omit<BlogPost, 'content'>>> {
  let posts = await loadBlogSummaries();
  
  // Filter by category if provided
  if (category && category !== 'all') {
    posts = posts.filter(post => post.category?.toLowerCase() === category.toLowerCase());
  }
  
  // Filter by search term if provided
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(term) ||
      post.excerpt?.toLowerCase().includes(term) ||
      post.tags?.some(tag => tag.toLowerCase().includes(term))
    );
  }
  
  return paginateArray(posts, page, itemsPerPage);
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await loadBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get all unique categories
export async function getBlogCategories(): Promise<string[]> {
  const posts = await loadBlogSummaries();
  const categorySet = new Set<string>();
  
  posts.forEach(post => {
    if (post.category) {
      categorySet.add(post.category);
    }
  });
  
  return Array.from(categorySet).sort();
}

// Get all unique tags
export async function getBlogTags(): Promise<string[]> {
  const posts = await loadBlogSummaries();
  const tagSet = new Set<string>();
  
  posts.forEach(post => {
    post.tags?.forEach(tag => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}
