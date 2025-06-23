
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Sample blog post data - in a real app, this would come from an API
  const blogPosts = {
    "deep-learning-nlp-guide": {
      title: "Deep Learning for Natural Language Processing: A Comprehensive Guide",
      author: "Prashant Gupta",
      date: "2024-03-15",
      readTime: "8 min read",
      tags: ["machine-learning", "nlp", "deep-learning"],
      category: "research",
      excerpt: "Exploring the latest advances in transformer architectures and their applications in real-world NLP tasks.",
      content: `
        <h2>Introduction to Modern NLP</h2>
        <p>Natural Language Processing has undergone a revolutionary transformation in recent years, primarily driven by the advent of transformer architectures and large language models. This comprehensive guide explores the cutting-edge techniques that are reshaping how we approach language understanding and generation.</p>
        
        <h2>The Transformer Revolution</h2>
        <p>The introduction of the Transformer architecture in 2017 marked a pivotal moment in NLP history. Unlike previous approaches that relied on recurrent neural networks, transformers leverage self-attention mechanisms to process sequences in parallel, dramatically improving both efficiency and performance.</p>
        
        <blockquote>
          "Attention is all you need" - this simple yet profound statement has become the foundation of modern NLP.
        </blockquote>
        
        <h2>Key Components of Transformer Architecture</h2>
        <ul>
          <li><strong>Self-Attention Mechanism:</strong> Allows the model to weigh the importance of different words in a sequence</li>
          <li><strong>Positional Encoding:</strong> Provides sequence order information without recurrence</li>
          <li><strong>Multi-Head Attention:</strong> Enables the model to focus on different aspects simultaneously</li>
          <li><strong>Feed-Forward Networks:</strong> Process the attention outputs through non-linear transformations</li>
        </ul>
        
        <h2>Practical Applications</h2>
        <p>The impact of transformer-based models extends far beyond academic research. Here are some key applications:</p>
        
        <h3>1. Text Classification</h3>
        <p>From sentiment analysis to document categorization, transformers have set new benchmarks across various classification tasks. The ability to understand context and nuance makes them particularly effective for complex classification problems.</p>
        
        <h3>2. Named Entity Recognition</h3>
        <p>Identifying and classifying entities within text has become significantly more accurate with transformer models, enabling better information extraction from unstructured data.</p>
        
        <h3>3. Question Answering Systems</h3>
        <p>Modern QA systems powered by transformers can understand context and provide accurate answers from large document collections, revolutionizing information retrieval.</p>
        
        <h2>Implementation Best Practices</h2>
        <p>When implementing transformer-based NLP solutions in production environments, consider these key factors:</p>
        
        <ol>
          <li><strong>Model Selection:</strong> Choose the right model size based on your computational constraints and accuracy requirements</li>
          <li><strong>Fine-tuning Strategy:</strong> Develop an effective fine-tuning approach for your specific domain</li>
          <li><strong>Data Preprocessing:</strong> Implement robust text preprocessing pipelines</li>
          <li><strong>Evaluation Metrics:</strong> Use appropriate metrics that align with your business objectives</li>
        </ol>
        
        <h2>Future Directions</h2>
        <p>The field of NLP continues to evolve rapidly. Emerging trends include:</p>
        
        <ul>
          <li>Multimodal models that combine text with other data types</li>
          <li>More efficient architectures that reduce computational requirements</li>
          <li>Better few-shot and zero-shot learning capabilities</li>
          <li>Enhanced interpretability and explainability features</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Deep learning has fundamentally transformed natural language processing, with transformer architectures leading the charge. As we continue to push the boundaries of what's possible, the potential applications seem limitless. The key to success lies in understanding these powerful tools and applying them thoughtfully to solve real-world problems.</p>
        
        <p>Whether you're building chatbots, content analysis systems, or language translation tools, the principles and techniques covered in this guide provide a solid foundation for your NLP journey.</p>
      `
    },
    "scalable-data-pipelines-airflow": {
      title: "Building Scalable Data Pipelines with Apache Airflow",
      author: "Prashant Gupta",
      date: "2024-03-10",
      readTime: "12 min read",
      tags: ["data-engineering", "python", "airflow"],
      category: "tutorial",
      excerpt: "Learn how to design and implement robust ETL pipelines that can handle millions of records efficiently.",
      content: `
        <h2>Introduction to Apache Airflow</h2>
        <p>Apache Airflow has emerged as the de facto standard for orchestrating complex data workflows. This comprehensive guide will walk you through building scalable, maintainable data pipelines that can handle enterprise-level workloads.</p>
        
        <h2>Core Concepts</h2>
        <p>Before diving into implementation details, let's understand the fundamental concepts that make Airflow powerful:</p>
        
        <ul>
          <li><strong>DAGs (Directed Acyclic Graphs):</strong> The blueprint of your workflow</li>
          <li><strong>Tasks:</strong> Individual units of work within a DAG</li>
          <li><strong>Operators:</strong> Templates for common tasks</li>
          <li><strong>Hooks:</strong> Interfaces to external systems</li>
        </ul>
        
        <h2>Building Your First Pipeline</h2>
        <p>Let's start with a practical example of an ETL pipeline that processes customer data:</p>
        
        <blockquote>
          The key to successful data pipeline design is thinking about failure scenarios from the beginning.
        </blockquote>
        
        <h2>Best Practices for Production</h2>
        <p>When deploying Airflow in production environments, consider these critical factors:</p>
        
        <ol>
          <li><strong>Resource Management:</strong> Properly configure worker resources and task concurrency</li>
          <li><strong>Monitoring:</strong> Implement comprehensive logging and alerting</li>
          <li><strong>Security:</strong> Secure your Airflow instance and manage credentials properly</li>
          <li><strong>Testing:</strong> Develop robust testing strategies for your DAGs</li>
        </ol>
      `
    },
    "ml-model-interpretability": {
      title: "Machine Learning Model Interpretability in Production",
      author: "Prashant Gupta", 
      date: "2024-03-05",
      readTime: "10 min read",
      tags: ["machine-learning", "explainable-ai", "production"],
      category: "research",
      excerpt: "Strategies for explaining black-box models and building trust with stakeholders in production environments.",
      content: `
        <h2>The Importance of Model Interpretability</h2>
        <p>As machine learning models become more complex and are deployed in critical business applications, the need for interpretability has never been greater. This article explores practical strategies for making your models more explainable.</p>
        
        <h2>Types of Interpretability</h2>
        <p>Understanding the different levels of interpretability helps in choosing the right approach:</p>
        
        <ul>
          <li><strong>Global Interpretability:</strong> Understanding the model's overall behavior</li>
          <li><strong>Local Interpretability:</strong> Explaining individual predictions</li>
          <li><strong>Model-Agnostic Methods:</strong> Techniques that work with any model</li>
          <li><strong>Model-Specific Methods:</strong> Interpretability built into the model architecture</li>
        </ul>
        
        <h2>Practical Implementation</h2>
        <p>When implementing interpretability in production systems, consider both technical and business requirements. The goal is to build trust while maintaining model performance.</p>
        
        <blockquote>
          The best interpretable model is often not the most accurate one, but the one that stakeholders can trust and act upon.
        </blockquote>
      `
    }
  };

  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  const handleShare = () => {
    toast({
      title: "Link Copied",
      description: "Blog post link has been copied to clipboard",
    });
  };

  const handleBookmark = () => {
    toast({
      title: "Bookmarked",
      description: "Post has been added to your reading list",
    });
  };

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
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-slate-700 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleBookmark}>
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-xs">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </Badge>
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
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
        <div 
          className="prose prose-lg dark:prose-invert max-w-none
                     prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-slate-100
                     prose-p:text-gray-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
                     prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                     prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-slate-800/50
                     prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:italic prose-blockquote:text-gray-800 dark:prose-blockquote:text-slate-200
                     prose-ul:text-gray-700 dark:prose-ul:text-slate-300
                     prose-ol:text-gray-700 dark:prose-ol:text-slate-300
                     prose-li:mb-2
                     prose-strong:text-gray-900 dark:prose-strong:text-slate-100"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
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
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark
              </Button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPost;
