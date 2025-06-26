import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Clock, Calendar, Share2, ClipboardCopy } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getBlogPost } from "@/data/blogLoader";
import { BlogPost as BlogPostType } from "@/utils/markdownUtils";
import { Giscus } from "@/components/Giscus";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Header from "@/components/Header";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [giscusTheme, setGiscusTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        const blogPost = await getBlogPost(slug);
        setPost(blogPost);
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
      setGiscusTheme((localStorage.getItem('theme') as 'light' | 'dark') || 'light');
    };
    
    window.addEventListener('theme-change', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);

    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  const handleShare = (type: string) => {
    if (!slug) return;

    const url = window.location.href;

    if (type === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        toast({
          title: "Link Copied",
          description: "Blog post link has been copied to clipboard",
        });
      });
    } else if (type === 'whatsapp') {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${post?.title} - ${url}`)}`;      
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleTagClick = (tag: string) => {
    // Navigate to blog page with tag filter
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
      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Header */}
        <header className="mb-12">
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
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-600 dark:text-slate-400 space-x-6 mb-8">
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt={post.author}
                className="w-8 h-8 rounded-full mr-3"
              />
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
          
          <p className="text-xl text-gray-600 dark:text-slate-400 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Article Content */}
        <MarkdownRenderer content={post.content} />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                alt={post.author}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-slate-100">{post.author}</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400">Data Scientist & AI Engineer</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="px-3 py-1 h-8">
                    <Share2 className="h-4 w-4 mr-2" />
                    <span>Share</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => handleShare('copy')}>
                    <ClipboardCopy className="h-4 w-4 mr-2" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 fill-current"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    <span>Share on WhatsApp</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </footer>
        
        {/* Comments Section with Giscus */}
        <section className="mt-16 pt-8 border-t border-gray-200 dark:border-slate-700">
          <h3 className="text-2xl font-bold mb-6">Comments & Reactions</h3>
          <Giscus
            key={giscusTheme} // Re-mount component on theme change for robustness
            repo="prashantgpt91/prashantgpt91.github.io"
            repoId="R_kgDONSu8aQ"
            category="Announcements"
            categoryId="DIC_kwDONSu8ac4CkQVo"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0" // Set to 0 to avoid requesting metadata
            inputPosition="top"
            theme={giscusTheme}
            lang="en"
          />
        </section>
      </article>
    </div>
  );
};

export default BlogPost;
