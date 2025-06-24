# Content Management Guide

This guide explains how to add new content (blog posts, projects, and papers) to the website. The content is managed through individual markdown files located in the `src/data` directory.

## Overview

- **Blog Posts**: Stored in `src/data/posts`
- **Projects**: Stored in `src/data/projects`
- **Papers**: Stored in `src/data/papers`

Each piece of content is a separate `.md` file. The file's metadata (like title, date, tags) is defined in a YAML frontmatter block at the top of the file, and the main content follows below it.

---

## Adding a New Blog Post

1.  **Create a new file:** Add a new `.md` file in the `src/data/posts/` directory. The filename should be a unique, URL-friendly slug (e.g., `my-new-post.md`).

2.  **Add frontmatter:** At the top of the file, add a YAML frontmatter block with the following fields:

    ```yaml
    ---
    id: 10 # A unique number
    slug: "my-new-post" # Matches the filename
    title: "My New Blog Post Title"
    excerpt: "A short, one-sentence summary of the post."
    date: "YYYY-MM-DD"
    tags: ["tag1", "tag2", "tag3"]
    category: "tutorial" # e.g., research, tutorial, opinion
    readTime: "5 min read"
    author: "Your Name"
    ---
    ```

3.  **Add content:** Below the frontmatter, write the blog post content using Markdown or HTML.

---

## Adding a New Project

1.  **Create a new file:** Add a new `.md` file in the `src/data/projects/` directory.

2.  **Add frontmatter:** At the top of the file, add a YAML frontmatter block with the following fields:

    ```yaml
    ---
    id: 7 # A unique number
    title: "My Awesome Project"
    description: "A detailed description of the project, its goals, and outcomes."
    technologies: ["React", "TypeScript", "Node.js"]
    businessImpact: "Explain the value or impact of the project."
    role: "Technical Lead" # or "Individual Contributor"
    category: "web-development" # e.g., machine-learning, data-engineering
    ---
    ```

---

## Adding a New Paper

1.  **Create a new file:** Add a new `.md` file in the `src/data/papers/` directory.

2.  **Add frontmatter:** At the top of the file, add a YAML frontmatter block with the following fields:

    ```yaml
    ---
    id: 7 # A unique number
    title: "A Groundbreaking Paper Title"
    authors: "Author One, Author Two, et al."
    description: "A concise summary of the paper's abstract or key contributions."
    year: "YYYY"
    venue: "Conference or Journal Name (e.g., NIPS, CVPR)"
    category: "nlp" # e.g., nlp, computer-vision, machine-learning
    tags: ["Tag1", "Tag2"]
    url: "https://link-to-paper.com"
    ---
    ```


This guide explains how to add new blog posts, projects, and papers to your portfolio website.

## Adding New Blog Posts

Blog posts are stored in the `src/data/blogData.ts` file. To add a new post:

1. Open `src/data/blogData.ts`
2. Add a new object to the `allPosts` array with the following structure:

```typescript
{
  id: [unique_number],  // Increment the highest existing ID
  slug: "your-post-slug",  // URL-friendly version of your title
  title: "Your Post Title",
  excerpt: "A brief description of your post",
  date: "YYYY-MM-DD",
  tags: ["tag1", "tag2", "tag3"],  // Related keywords
  category: "research",  // Choose from: research, tutorial, opinion, etc.
  readTime: "X min read",
  content: `
    <h2>Your First Heading</h2>
    <p>Your paragraph content goes here. You can use HTML tags for formatting.</p>
    
    <h2>Another Section</h2>
    <p>More content here...</p>
    
    <blockquote>
      <p>You can add quotes like this.</p>
    </blockquote>
    
    <h2>Lists</h2>
    <ul>
      <li><strong>Bold Item:</strong> Description</li>
      <li><strong>Another Item:</strong> Another description</li>
    </ul>
  `
}
```

3. Save the file and rebuild/deploy your site

## Adding New Projects

Projects data should be added to a dedicated data file. If it doesn't exist yet:

1. Create `src/data/projectsData.ts` with this structure:

```typescript
export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;  // Path to project image
  tags: string[];
  demoUrl?: string;  // Optional demo link
  githubUrl?: string;  // Optional GitHub repo link
  details?: string;  // Optional HTML content for detailed project view
}

export const allProjects: Project[] = [
  {
    id: 1,
    slug: "project-name",
    title: "Project Title",
    description: "Short description of what this project does and technologies used",
    image: "/images/projects/project-name.webp",  // Add your image to public/images/projects/
    tags: ["react", "machine-learning", "typescript"],
    demoUrl: "https://demo-link.com",
    githubUrl: "https://github.com/yourusername/repo",
    details: `
      <h2>Project Overview</h2>
      <p>Detailed description of your project...</p>
      
      <h2>Technologies Used</h2>
      <ul>
        <li>Technology 1</li>
        <li>Technology 2</li>
      </ul>
      
      <h2>Challenges & Solutions</h2>
      <p>Explain interesting problems you solved...</p>
    `
  },
  // Add more projects here
];
```

## Adding Research Papers

If you want to showcase academic papers:

1. Create `src/data/papersData.ts`:

```typescript
export interface Paper {
  id: number;
  title: string;
  authors: string[];
  publication: string;  // Journal/Conference name
  year: number;
  abstract: string;
  pdfUrl?: string;  // Link to PDF
  doiUrl?: string;  // DOI link
  tags: string[];
}

export const allPapers: Paper[] = [
  {
    id: 1,
    title: "Your Paper Title",
    authors: ["Your Name", "Co-author Name"],
    publication: "Journal or Conference Name",
    year: 2023,
    abstract: "Brief abstract of your paper...",
    pdfUrl: "https://link-to-pdf.com",
    doiUrl: "https://doi.org/your-doi",
    tags: ["machine-learning", "nlp"]
  },
  // Add more papers here
];
```

2. Create a new Papers page component in `src/pages/Papers.tsx` to display your papers

## Images for Projects and Posts

1. Place your images in the appropriate folders under `public/images/`:
   - Blog post images: `public/images/blog/`
   - Project images: `public/images/projects/`
   - Profile or other images: `public/images/`

2. Reference images in your content using the path without "public": 
   ```
   /images/projects/your-image.webp
   ```

## Deployment

After adding new content:

1. Commit and push your changes to GitHub:
```bash
git add .
git commit -m "Add new content"
git push origin main
```

2. Deploy your site:
```bash
npm run deploy
```

This will build your site and deploy it to GitHub Pages while preserving your custom domain.
