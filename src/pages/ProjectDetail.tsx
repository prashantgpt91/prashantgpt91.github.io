import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { getProject } from "@/data/projectsLoader";
import { Project } from "@/utils/markdownUtils";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const projectData = await getProject(slug);
        setProject(projectData);
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/projects" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600 dark:text-slate-400 mb-6">{project.description}</p>
          
          {/* Project Meta */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-sm text-gray-600 dark:text-slate-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{project.startDate} {project.endDate && `- ${project.endDate}`}</span>
            </div>
            <Badge 
              variant={project.status === "completed" ? "default" : "outline"}
              className="capitalize"
            >
              {project.status}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {project.category}
            </Badge>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2 flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="flex gap-4">
              {project.githubUrl && (
                <Button asChild variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          )}
        </header>

        {/* Project Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownRenderer content={project.content} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
