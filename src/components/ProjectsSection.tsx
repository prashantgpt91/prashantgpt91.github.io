
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Briefcase, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProjectsSection = () => {
  const [projectsSearchTerm, setProjectsSearchTerm] = useState("");
  const [selectedProjectTech, setSelectedProjectTech] = useState("all");

  // Updated projects data with new structure
  const projects = [
    {
      id: 1,
      title: "Customer Churn Prediction System",
      description: "End-to-end ML pipeline predicting customer churn with 94% accuracy using ensemble methods and feature engineering.",
      technologies: ["Python", "Sklearn", "XGBoost", "Docker", "AWS"],
      businessImpact: "Reduced customer churn by 23%, saving $2.4M annually",
      role: "Technical Lead"
    },
    {
      id: 2,
      title: "Real-time Analytics Dashboard",
      description: "Interactive dashboard processing 100K+ events/minute with real-time visualizations and anomaly detection.",
      technologies: ["Python", "Kafka", "Elasticsearch", "React", "D3.js"],
      businessImpact: "Improved decision-making speed by 60% for operations team",
      role: "Individual Contributor"
    },
    {
      id: 3,
      title: "NLP Document Classification",
      description: "Multi-label document classifier using BERT and transformer architectures for legal document processing.",
      technologies: ["Python", "PyTorch", "Transformers", "BERT", "FastAPI"],
      businessImpact: "Automated 80% of document processing, reducing manual effort by 15 hours/week",
      role: "Technical Lead"
    }
  ];

  const allProjectTechnologies = ["all", ...Array.from(new Set(projects.flatMap(project => project.technologies)))];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(projectsSearchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(projectsSearchTerm.toLowerCase());
    const matchesTech = selectedProjectTech === "all" || project.technologies.includes(selectedProjectTech);
    return matchesSearch && matchesTech;
  });

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Featured Projects</h2>
        <Link to="/projects">
          <Button variant="outline">
            View All Projects
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
      
      {/* Projects Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={projectsSearchTerm}
            onChange={(e) => setProjectsSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedProjectTech}
          onChange={(e) => setSelectedProjectTech(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
        >
          {allProjectTechnologies.map(tech => (
            <option key={tech} value={tech}>
              {tech === "all" ? "All Technologies" : tech}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.slice(0, 3).map((project) => (
          <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
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
              
              {/* Business Impact */}
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <Briefcase className="h-3 w-3 mr-2" />
                  Business Impact
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-400">{project.businessImpact}</p>
              </div>
              
              {/* Role */}
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <User className="h-3 w-3 mr-2" />
                  Role
                </h4>
                <Badge variant={project.role === "Technical Lead" ? "default" : "secondary"} className="text-xs">
                  {project.role}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
