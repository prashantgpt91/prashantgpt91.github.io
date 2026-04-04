import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { formatDateRange } from "@/utils/dateFormat";
import { getProject } from "@/data/projectsLoader";
import { Project } from "@/utils/markdownUtils";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Giscus } from "@/components/Giscus";
import PostEngagementBar from "@/components/PostEngagementBar";
import BackToTop from "@/components/BackToTop";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { updatePageMeta } from "@/utils/seo";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [giscusTheme, setGiscusTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

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

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      try {
        const projectData = await getProject(slug);
        setProject(projectData);
        if (projectData) {
          updatePageMeta({
            title: projectData.title,
            description: projectData.description,
            path: `/projects/${slug}`,
          });
        }
      } catch (error) {
        console.error('Error loading project:', error);
        toast({
          title: "Error",
          description: "Failed to load project. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [slug, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex justify-center items-center">
        <p className="text-lg text-gray-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Project Not Found</h1>
          <p className="text-gray-600 dark:text-slate-400 mb-6">The project you're looking for doesn't exist.</p>
          <Link to="/projects">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Button */}
        <Link to="/projects" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <header className="mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400 mb-3">
            <span>{formatDateRange(project.startDate, project.endDate)}</span>
            {(project.githubUrl || project.liveUrl) && (
              <>
                <span className="text-gray-300 dark:text-slate-600">|</span>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-slate-100 transition-colors">
                    <Github className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-slate-100 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Demo</span>
                  </a>
                )}
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.title}</h1>
          <p className="text-lg text-gray-600 dark:text-slate-400 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs font-normal">{tech}</Badge>
            ))}
          </div>
        </header>

        {/* Top engagement bar */}
        <div className="border-y border-gray-200 dark:border-slate-700 py-1 mb-10">
          <PostEngagementBar title={project.title} />
        </div>

        {/* Project Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownRenderer content={project.content} />
        </div>

        {/* Bottom engagement bar */}
        <div className="border-y border-gray-200 dark:border-slate-700 py-1 mt-12 mb-10">
          <PostEngagementBar title={project.title} />
        </div>

        {/* Comments */}
        <section id="comments" className="pt-8 border-t border-gray-200 dark:border-slate-700">
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
      </div>
    </div>
  );
};

export default ProjectDetail;
