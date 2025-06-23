
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const BlogSection = () => {
  const [blogSearchTerm, setBlogSearchTerm] = useState("");
  const [selectedBlogTag, setSelectedBlogTag] = useState("all");
  const navigate = useNavigate();

  // Sample blog posts data
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
    }
  ];

  const allBlogTags = ["all", ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(blogSearchTerm.toLowerCase());
    const matchesTag = selectedBlogTag === "all" || post.tags.includes(selectedBlogTag);
    return matchesSearch && matchesTag;
  });

  const handleBlogClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <section id="blog" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Latest Blog Posts</h2>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search blog posts..."
            value={blogSearchTerm}
            onChange={(e) => setBlogSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedBlogTag}
          onChange={(e) => setSelectedBlogTag(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
        >
          {allBlogTags.map(tag => (
            <option key={tag} value={tag}>
              {tag === "all" ? "All Tags" : tag}
            </option>
          ))}
        </select>
      </div>

      {/* Blog Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {filteredBlogPosts.map((post) => (
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
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Blog Posts Button */}
      <div className="text-center">
        <Link to="/blog">
          <Button variant="outline">
            View All Blog Posts
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
