import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { loadBlogSummaries } from "@/data/blogLoader";
import { BlogPost } from "@/utils/markdownUtils";

interface RelatedPostsProps {
  currentSlug: string;
  category?: string;
  tags?: string[];
}

const RelatedPosts = ({ currentSlug, category, tags }: RelatedPostsProps) => {
  const [posts, setPosts] = useState<Omit<BlogPost, "content">[]>([]);

  useEffect(() => {
    const load = async () => {
      const allPosts = await loadBlogSummaries();
      // Filter out current post, prefer same category/tags
      const others = allPosts.filter((p) => p.slug !== currentSlug);
      const scored = others.map((p) => {
        let score = 0;
        if (category && p.category === category) score += 2;
        if (tags) {
          const overlap = p.tags?.filter((t) => tags.includes(t)).length || 0;
          score += overlap;
        }
        return { post: p, score };
      });
      scored.sort((a, b) => b.score - a.score);
      setPosts(scored.slice(0, 3).map((s) => s.post));
    };
    load();
  }, [currentSlug, category, tags]);

  if (posts.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold mb-5">More posts</h2>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group flex items-center justify-between py-3 px-4 -mx-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="min-w-0">
              <h3 className="text-base font-medium text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-500 mt-0.5">
                {post.date} &middot; {post.readTime}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0 ml-4" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
