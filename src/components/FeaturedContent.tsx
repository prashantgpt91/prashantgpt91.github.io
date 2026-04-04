import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, FolderOpen, BookOpen } from "lucide-react";
import { loadBlogSummaries } from "@/data/blogLoader";
import { loadProjectSummaries } from "@/data/projectsLoader";
import { loadPaperSummaries } from "@/data/papersLoader";

interface FeaturedItem {
  title: string;
  description: string;
  href: string;
  type: "blog" | "project" | "paper";
  date: string;
}

const typeConfig = {
  blog: { icon: FileText, label: "Blog", color: "text-blue-500" },
  project: { icon: FolderOpen, label: "Project", color: "text-purple-500" },
  paper: { icon: BookOpen, label: "Paper", color: "text-teal-500" },
};

const FeaturedContent = () => {
  const [items, setItems] = useState<FeaturedItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [blogs, projects, papers] = await Promise.all([
        loadBlogSummaries(),
        loadProjectSummaries(),
        loadPaperSummaries(),
      ]);

      const featured: FeaturedItem[] = [];

      // Get up to 2 featured/recent blog posts
      blogs.filter((b) => b.featured).slice(0, 2).forEach((b) => {
        featured.push({
          title: b.title,
          description: b.excerpt || "",
          href: `/blog/${b.slug}`,
          type: "blog",
          date: b.date,
        });
      });

      // Get 1 featured project
      projects.filter((p) => p.featured).slice(0, 1).forEach((p) => {
        featured.push({
          title: p.title,
          description: p.description || "",
          href: `/projects/${p.slug}`,
          type: "project",
          date: p.startDate,
        });
      });

      // Get 1 featured paper
      papers.filter((p) => p.featured).slice(0, 1).forEach((p) => {
        featured.push({
          title: p.title,
          description: p.abstract || "",
          href: `/papers/${p.slug}`,
          type: "paper",
          date: String(p.year),
        });
      });

      // If not enough featured, fill with recent
      if (featured.length < 3) {
        const slugs = new Set(featured.map((f) => f.href));
        for (const b of blogs) {
          if (featured.length >= 4) break;
          const href = `/blog/${b.slug}`;
          if (!slugs.has(href)) {
            featured.push({
              title: b.title,
              description: b.excerpt || "",
              href,
              type: "blog",
              date: b.date,
            });
            slugs.add(href);
          }
        }
      }

      setItems(featured.slice(0, 4));
      setLoaded(true);
    };
    load();
  }, []);

  if (!loaded) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="shimmer h-4 w-24 rounded mb-6" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 py-4">
              <div className="shimmer h-5 w-5 rounded shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="shimmer h-4 w-3/4 rounded" />
                <div className="shimmer h-3 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-sm font-medium text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-6">
        Recent work
      </h2>
      <div className="grid gap-3">
        {items.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className="group flex items-start gap-4 py-4 px-4 -mx-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${config.color}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-medium text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-slate-500 line-clamp-1">
                  {item.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 mt-1 text-gray-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedContent;
