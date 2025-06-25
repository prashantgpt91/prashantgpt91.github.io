# Content Management Guide for prashant.sh

This guide explains how to add new blog posts, projects, and research papers to your portfolio website using the **automatic markdown-based content management system**.

## 🚀 Overview

Your portfolio now uses an **automatic content management system** where:
- **Blog posts** are stored as individual `.md` files in `src/data/blog/`
- **Projects** are stored as individual `.md` files in `src/data/projects/`  
- **Research papers** are stored as individual `.md` files in `src/data/papers/`

**✨ Key Feature: AUTOMATIC DETECTION**
- Simply drop your `.md` file in the appropriate folder
- **No code changes required** - content appears automatically
- No manual imports or configuration needed
- Content is immediately available on your website

Each markdown file contains frontmatter (metadata) and content written in full markdown syntax.

## 🚀 Automatic Content Loading System

### How It Works
- Uses Vite's `import.meta.glob` functionality
- Automatically scans directories for `.md` files
- Extracts filename as slug (e.g., `my-post.md` → `my-post`)
- Parses frontmatter and content automatically
- Makes content immediately available on the website

### Benefits
- **Zero Configuration**: No manual imports or code changes needed
- **Scalable**: Add unlimited content without touching code
- **Developer Friendly**: Simple file-based workflow
- **Instant Availability**: Content appears immediately after file creation
- **Error Resilient**: Failed imports don't break the entire system

### File Structure
```
src/data/
├── blog/
│   ├── my-first-post.md
│   ├── another-post.md
│   └── latest-article.md
├── projects/
│   ├── my-project.md
│   ├── another-project.md
│   └── cool-app.md
└── papers/
    ├── research-paper-1.md
    ├── another-study.md
    └── latest-research.md
```

## 📝 Adding New Blog Posts

### Step 1: Create the Markdown File

1. Navigate to `src/data/blog/`
2. Create a new file with a descriptive name: `your-post-title.md`
3. Use the following template:

```markdown
---
title: "Your Blog Post Title"
excerpt: "A brief description of your blog post that appears in listings"
date: "2024-01-15"
tags: ["machine-learning", "python", "tutorial"]
category: "tutorial"
readTime: "8 min read"
author: "Your Name"
slug: "your-post-title"
---

# Your Blog Post Title

Write your blog post content here using full markdown syntax.

## Subheading

You can use all markdown features:

- **Bold text**
- *Italic text*
- `Inline code`
- [Links](https://example.com)

### Code Blocks

```python
def hello_world():
    print("Hello, World!")
    return "success"
```

### Lists

1. Numbered lists
2. Work great
3. For step-by-step guides

### Blockquotes

> This is a blockquote that stands out from regular text.

### Tables

| Feature | Supported |
|---------|-----------|
| Tables  | ✅        |
| Images  | ✅        |
| Code    | ✅        |

### Images

![Alt text for image](path/to/image.jpg)

## Conclusion

Your conclusion goes here.
```

## 📈 Adding New Projects

### Step 1: Create the Markdown File

1. Navigate to `src/data/projects/`
2. Create a new file: `your-project-name.md`
3. Use this template:

```markdown
---
title: "Your Project Title"
description: "Brief description of what your project does"
technologies: ["React", "TypeScript", "Node.js", "MongoDB"]
category: "web-development"
status: "completed"
startDate: "2024-01-01"
endDate: "2024-03-15"
githubUrl: "https://github.com/yourusername/project"
liveUrl: "https://yourproject.com"
featured: true
slug: "your-project-name"
---

# Your Project Title

## Overview

Detailed description of your project, what it does, and why you built it.

## Features

- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication

## Architecture

Explain your project's architecture, design decisions, and any interesting technical challenges you solved.

## Screenshots

![Project Screenshot](path/to/screenshot.jpg)

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/project.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## Lessons Learned

What did you learn while building this project? What would you do differently next time?

## 📊 Adding New Research Papers

### Step 1: Create the Markdown File

1. Navigate to `src/data/papers/`
2. Create a new file: `your-paper-title.md`
3. Use this template:

```markdown
---
title: "Your Research Paper Title"
authors: ["Your Name", "Co-Author Name"]
journal: "Journal Name"
year: 2024
volume: "12"
pages: "123-145"
doi: "10.1000/journal.2024.001"
arxivUrl: "https://arxiv.org/abs/2024.001"
pdfUrl: "path/to/paper.pdf"
abstract: "Brief abstract of your research paper"
keywords: ["machine learning", "natural language processing", "deep learning"]
category: "machine-learning"
status: "published"
citations: 15
slug: "your-paper-title"
---

# Your Research Paper Title

## Abstract

Your paper's abstract goes here. This should be a concise summary of your research, methodology, results, and conclusions.

## 1. Introduction

### 1.1 Background

Provide background information and context for your research.

### 1.2 Problem Statement

Clearly define the problem you're addressing.

### 1.3 Contributions

List your main contributions:

1. First contribution
2. Second contribution
3. Third contribution

## 2. Related Work

Discuss previous research in this area and how your work relates to or builds upon it.

## 3. Methodology

### 3.1 Approach

Describe your research approach and methodology.

### 3.2 Experimental Setup

Detail your experimental setup, datasets used, and evaluation metrics.

## 4. Results

### 4.1 Experimental Results

Present your results with tables and figures:

| Model | Accuracy | F1-Score | Precision | Recall |
|-------|----------|----------|-----------|--------|
| Baseline | 0.85 | 0.83 | 0.84 | 0.82 |
| Our Method | 0.92 | 0.91 | 0.93 | 0.89 |

### 4.2 Analysis

Analyze and discuss your results.

## 5. Conclusion

Summarize your findings and suggest future work.

## References

1. Author, A. (2023). "Title of Reference Paper." *Journal Name*, 10(2), 123-145.
2. Author, B. (2022). "Another Reference." *Conference Proceedings*, 456-789.

## Markdown Features Supported

Your content management system supports all standard markdown features plus:

### Basic Formatting
- **Bold text** with `**text**`
- *Italic text* with `*text*`
- `Inline code` with backticks
- ~~Strikethrough~~ with `~~text~~`

### Headers
```markdown
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
```

### Lists
```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
   1. Nested item
```

### Links and Images
```markdown
[Link text](https://example.com)
![Alt text](path/to/image.jpg)
```

### Code Blocks
````markdown
```python
def example():
    return "Hello, World!"
```
````

### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
```

### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

### Horizontal Rules
```markdown
---
```

## Best Practices

1. **File Naming**: Use kebab-case for file names (e.g., `my-blog-post.md`)
2. **Automatic Slugs**: Filename becomes the slug, so choose meaningful names
3. **Dates**: Use YYYY-MM-DD format for dates
4. **Tags**: Use lowercase, hyphenated tags for consistency
5. **Images**: Store images in `public/images/` and reference them with `/images/filename.jpg`
6. **Content**: Write in clear, well-structured markdown for best rendering
7. **Testing**: Simply create the file and refresh your browser - content appears instantly!

## Deployment

After adding new content:

1. Test locally with `npm run dev`
2. Build the project with `npm run build`
3. Deploy using your preferred method

Your new content will be automatically loaded and displayed on your portfolio website!
