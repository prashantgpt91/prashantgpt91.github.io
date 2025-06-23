import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowUp, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Extended blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Deep Learning for Natural Language Processing: A Comprehensive Guide",
      excerpt: "Exploring the latest advances in transformer architectures and their applications in real-world NLP tasks.",
      date: "2024-03-15",
      tags: ["machine-learning", "nlp", "deep-learning"],
      category: "research",
      readTime: "8 min read",
      slug: "deep-learning-nlp-guide"
    },
    {
      id: 2,
      title: "Building Scalable Data Pipelines with Apache Airflow",
      excerpt: "Learn how to design and implement robust ETL pipelines that can handle millions of records efficiently.",
      date: "2024-03-10",
      tags: ["data-engineering", "python", "airflow"],
      category: "tutorial",
      readTime: "12 min read",
      slug: "scalable-data-pipelines-airflow"
    },
    {
      id: 3,
      title: "Machine Learning Model Interpretability in Production",
      excerpt: "Strategies for explaining black-box models and building trust with stakeholders in production environments.",
      date: "2024-03-05",
      tags: ["machine-learning", "explainable-ai", "production"],
      category: "research",
      readTime: "10 min read",
      slug: "ml-model-interpretability"
    },
    {
      id: 4,
      title: "Getting Started with Computer Vision in Python",
      excerpt: "A beginner-friendly introduction to computer vision concepts and practical implementations using OpenCV and TensorFlow.",
      date: "2024-02-28",
      tags: ["computer-vision", "python", "opencv", "tensorflow"],
      category: "tutorial",
      readTime: "15 min read",
      slug: "computer-vision-python-intro"
    },
    {
      id: 5,
      title: "The Future of AI: Trends and Predictions for 2024",
      excerpt: "Analyzing emerging trends in artificial intelligence and what they mean for businesses and developers.",
      date: "2024-02-20",
      tags: ["ai", "trends", "future", "business"],
      category: "opinion",
      readTime: "6 min read",
      slug: "ai-trends-2024"
    },
    {
      id: 6,
      title: "Optimizing Deep Learning Models for Edge Deployment",
      excerpt: "Techniques for model compression, quantization, and optimization for deployment on mobile and edge devices.",
      date: "2024-02-15",
      tags: ["deep-learning", "optimization", "edge-computing", "mobile"],
      category: "tutorial",
      readTime: "14 min read",
      slug: "dl-models-edge-deployment"
    },
    {
      id: 7,
      title: "Data Quality: The Foundation of Successful ML Projects",
      excerpt: "Why data quality matters more than algorithms and how to implement effective data validation strategies.",
      date: "2024-02-10",
      tags: ["data-quality", "machine-learning", "best-practices"],
      category: "research",
      readTime: "9 min read",
      slug: "data-quality-ml-foundation"
    },
    {
      id: 8,
      title: "Building Real-time Recommendation Systems at Scale",
      excerpt: "Architecture patterns and technologies for building recommendation systems that serve millions of users.",
      date: "2024-02-05",
      tags: ["recommendation-systems", "real-time", "scalability", "architecture"],
      category: "tutorial",
      readTime: "16 min read",
      slug: "realtime-recommendation-systems"
    }
  ];

  const allTags = ["all", ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];
  const allCategories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesTag && matchesCategory;
  });

  const handleBlogClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

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
          <h1 className="text-4xl font-bold mt-4 mb-2">All Blog Posts</h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">
            Insights, tutorials, and thoughts on data science, AI, and machine learning
          </p>
        </div>
      </header>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
          >
            {allTags.map(tag => (
              <option key={tag} value={tag}>
                {tag === "all" ? "All Tags" : tag.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
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
                {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">
          Showing {filteredPosts.length} of {blogPosts.length} posts
        </p>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => handleBlogClick(post.slug)}>
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400 mb-2">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Badge variant="outline" className="text-xs">
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-slate-400">No blog posts found matching your criteria.</p>
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

export default Blog;
