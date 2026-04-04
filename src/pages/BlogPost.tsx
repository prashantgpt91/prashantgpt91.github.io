import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getBlogPost } from "@/data/blogLoader";
import { BlogPost as BlogPostType } from "@/utils/markdownUtils";
import { Giscus } from "@/components/Giscus";
import PostEngagementBar from "@/components/PostEngagementBar";
import BackToTop from "@/components/BackToTop";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Header from "@/components/Header";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import RelatedPosts from "@/components/RelatedPosts";
import { updatePageMeta } from "@/utils/seo";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [giscusTheme, setGiscusTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      try {
        const blogPost = await getBlogPost(slug);
        setPost(blogPost);
        if (blogPost) {
          updatePageMeta({
            title: blogPost.title,
            description: blogPost.excerpt,
            path: `/blog/${slug}`,
          });
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  useEffect(() => {
    const handleThemeChange = () => {
      const newTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
      setGiscusTheme(newTheme);
    };
    window.addEventListener('theme-change', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);
    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  const handleTagClick = (tag: string) => {
    window.location.href = `/blog?tag=${encodeURIComponent(tag)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100">
      <Header />
      <ReadingProgressBar />
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-xs">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </Badge>
            {post.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex items-center text-gray-600 dark:text-slate-400 space-x-6 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full mr-3 bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <p className="text-base md:text-lg text-gray-600 dark:text-slate-400 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Top engagement bar */}
        <div className="border-y border-gray-200 dark:border-slate-700 py-1 mb-10">
          <PostEngagementBar title={post.title} />
        </div>

        {/* Article Content */}
        <MarkdownRenderer content={post.content} />

        {/* Bottom engagement bar */}
        <div className="border-y border-gray-200 dark:border-slate-700 py-1 mt-12 mb-10">
          <PostEngagementBar title={post.title} />
        </div>

        {/* Author footer */}
        <footer className="mb-12">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
              {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-slate-100">{post.author}</h4>
              <p className="text-sm text-gray-600 dark:text-slate-400">Staff AI Engineer</p>
            </div>
          </div>
        </footer>

        {/* Related Posts */}
        <RelatedPosts currentSlug={slug || ''} category={post.category} tags={post.tags} />

        {/* Comments */}
        <section id="comments" className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold mb-4">Comments</h2>
          <Giscus
            repo="prashantgpt91/prashantgpt91.github.io"
            repoId="MDEwOlJlcG9zaXRvcnk4NzczMjkyMw=="
            category="General"
            categoryId="DIC_kwDOBTqyu84Cr7SZ"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={giscusTheme}
            lang="en"
          />
        </section>

        <BackToTop />
      </article>
    </div>
  );
};

export default BlogPost;
