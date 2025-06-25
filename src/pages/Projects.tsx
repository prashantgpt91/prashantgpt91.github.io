import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowUp, Search, Briefcase, User } from "lucide-react";
import { Link } from "react-router-dom";
import { loadProjects, getAllTechnologies, getProjectCategories } from "@/data/projectsLoader";
import { Project } from "@/utils/markdownUtils";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [allTechnologies, setAllTechnologies] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load projects data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, technologies, categories] = await Promise.all([
          loadProjects(),
          getAllTechnologies(),
          getProjectCategories()
        ]);
        
        setProjects(projectsData);
        setAllTechnologies(['all', ...technologies]);
        setAllCategories(['all', ...categories]);
      } catch (error) {
        console.error('Error loading projects data:', error);
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTech = selectedTech === "all" || project.technologies.includes(selectedTech);
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesTech && matchesCategory;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 flex justify-center items-center">
        <p className="text-lg text-gray-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100">
      <Header />
      
      {/* Page Title */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-2">All Projects</h1>
        <p className="text-lg text-gray-600 dark:text-slate-400">
          A comprehensive collection of my data science and AI engineering projects
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
          >
            {allTechnologies.map(tech => (
              <option key={tech} value={tech}>
                {tech === "all" ? "All Technologies" : tech}
              </option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
          >
            {allCategories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link 
                    to={`/projects/${project.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {project.title}
                  </Link>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Category & Status */}
                <div className="flex gap-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <Briefcase className="h-3 w-3 mr-2" />
                      Category
                    </h4>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <User className="h-3 w-3 mr-2" />
                      Status
                    </h4>
                    <Badge 
                      variant={project.status === "completed" ? "default" : "outline"} 
                      className="text-xs capitalize"
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>

                {/* Project Links */}
                {(project.githubUrl || project.liveUrl) && (
                  <div className="flex gap-2 pt-2">
                    {project.githubUrl && (
                      <Button asChild size="sm" variant="outline">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button asChild size="sm" variant="default">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-slate-400">No projects found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* Scroll to top button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 rounded-full p-3"
        size="sm"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Projects;
