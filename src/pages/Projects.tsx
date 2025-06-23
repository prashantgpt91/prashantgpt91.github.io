import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowUp, Search, Briefcase, User } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Extended projects data
  const projects = [
    {
      id: 1,
      title: "Customer Churn Prediction System",
      description: "End-to-end ML pipeline predicting customer churn with 94% accuracy using ensemble methods and feature engineering.",
      technologies: ["Python", "Sklearn", "XGBoost", "Docker", "AWS"],
      businessImpact: "Reduced customer churn by 23%, saving $2.4M annually",
      role: "Technical Lead",
      category: "machine-learning"
    },
    {
      id: 2,
      title: "Real-time Analytics Dashboard",
      description: "Interactive dashboard processing 100K+ events/minute with real-time visualizations and anomaly detection.",
      technologies: ["Python", "Kafka", "Elasticsearch", "React", "D3.js"],
      businessImpact: "Improved decision-making speed by 60% for operations team",
      role: "Individual Contributor",
      category: "data-engineering"
    },
    {
      id: 3,
      title: "NLP Document Classification",
      description: "Multi-label document classifier using BERT and transformer architectures for legal document processing.",
      technologies: ["Python", "PyTorch", "Transformers", "BERT", "FastAPI"],
      businessImpact: "Automated 80% of document processing, reducing manual effort by 15 hours/week",
      role: "Technical Lead",
      category: "nlp"
    },
    {
      id: 4,
      title: "Computer Vision Quality Control",
      description: "Automated quality inspection system using deep learning for manufacturing defect detection.",
      technologies: ["Python", "TensorFlow", "OpenCV", "Kubernetes", "GCP"],
      businessImpact: "Reduced defect rate by 45% and inspection time by 70%",
      role: "Technical Lead",
      category: "computer-vision"
    },
    {
      id: 5,
      title: "Fraud Detection Platform",
      description: "Real-time fraud detection system processing millions of transactions with sub-100ms latency.",
      technologies: ["Python", "Apache Spark", "Redis", "PostgreSQL", "Docker"],
      businessImpact: "Prevented $5.2M in fraudulent transactions with 98.5% accuracy",
      role: "Individual Contributor",
      category: "machine-learning"
    },
    {
      id: 6,
      title: "Recommendation Engine",
      description: "Collaborative filtering and content-based recommendation system for e-commerce platform.",
      technologies: ["Python", "Scikit-learn", "Apache Airflow", "MongoDB", "AWS"],
      businessImpact: "Increased conversion rate by 35% and average order value by 28%",
      role: "Technical Lead",
      category: "machine-learning"
    }
  ];

  const allTechnologies = ["all", ...Array.from(new Set(projects.flatMap(project => project.technologies)))];
  const allRoles = ["all", "Technical Lead", "Individual Contributor"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTech = selectedTech === "all" || project.technologies.includes(selectedTech);
    const matchesRole = selectedRole === "all" || project.role === selectedRole;
    return matchesSearch && matchesTech && matchesRole;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-slate-700 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Prashant Gupta
              </Link>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mt-4 mb-2">All Projects</h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">
            A comprehensive collection of my data science and AI engineering projects
          </p>
        </div>
      </header>

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
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
          >
            {allRoles.map(role => (
              <option key={role} value={role}>
                {role === "all" ? "All Roles" : role}
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
