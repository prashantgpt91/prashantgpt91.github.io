export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: string;
  readTime: string;
  author: string;
  content: string;
}

const allPosts: Omit<Post, 'author'>[] = [
  {
    id: 1,
    slug: "deep-learning-nlp-guide",
    title: "Deep Learning for Natural Language Processing: A Comprehensive Guide",
    excerpt: "Exploring the latest advances in transformer architectures and their applications in real-world NLP tasks.",
    date: "2024-03-15",
    tags: ["machine-learning", "nlp", "deep-learning"],
    category: "research",
    readTime: "8 min read",
    content: `
      <h2>Introduction to Modern NLP</h2>
      <p>Natural Language Processing has undergone a revolutionary transformation in recent years, primarily driven by the advent of transformer architectures and large language models. This comprehensive guide explores the cutting-edge techniques that are reshaping how we approach language understanding and generation.</p>
      
      <h2>The Transformer Revolution</h2>
      <p>The introduction of the Transformer architecture in 2017 marked a pivotal moment in NLP history. Unlike previous approaches that relied on recurrent neural networks, transformers leverage self-attention mechanisms to process sequences in parallel, dramatically improving both efficiency and performance.</p>
      
      <blockquote>
        <p>"Attention is all you need" - this simple yet profound statement has become the foundation of modern NLP.</p>
      </blockquote>
      
      <h2>Key Components of Transformer Architecture</h2>
      <ul>
        <li><strong>Self-Attention Mechanism:</strong> Allows the model to weigh the importance of different words in a sequence</li>
        <li><strong>Positional Encoding:</strong> Provides sequence order information without recurrence</li>
        <li><strong>Multi-Head Attention:</strong> Enables the model to focus on different aspects simultaneously</li>
        <li><strong>Feed-Forward Networks:</strong> Process the attention outputs through non-linear transformations</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Deep learning has fundamentally transformed natural language processing, with transformer architectures leading the charge. As we continue to push the boundaries of what's possible, the potential applications seem limitless.</p>
    `
  },
  {
    id: 2,
    slug: "scalable-data-pipelines-airflow",
    title: "Building Scalable Data Pipelines with Apache Airflow",
    excerpt: "Learn how to design and implement robust ETL pipelines that can handle millions of records efficiently.",
    date: "2024-03-10",
    tags: ["data-engineering", "python", "airflow"],
    category: "tutorial",
    readTime: "12 min read",
    content: `
      <h2>Introduction to Apache Airflow</h2>
      <p>Apache Airflow has emerged as the de facto standard for orchestrating complex data workflows. This comprehensive guide will walk you through building scalable, maintainable data pipelines that can handle enterprise-level workloads.</p>

      <h2>Core Concepts</h2>
      <ul>
        <li><strong>DAGs (Directed Acyclic Graphs):</strong> The blueprint of your workflow</li>
        <li><strong>Tasks:</strong> Individual units of work within a DAG</li>
        <li><strong>Operators:</strong> Templates for common tasks</li>
        <li><strong>Hooks:</strong> Interfaces to external systems</li>
      </ul>

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
  {
    id: 3,
    slug: "ml-model-interpretability",
    title: "Machine Learning Model Interpretability in Production",
    excerpt: "Strategies for explaining black-box models and building trust with stakeholders in production environments.",
    date: "2024-03-05",
    tags: ["machine-learning", "explainable-ai", "production"],
    category: "research",
    readTime: "10 min read",
    content: `
        <h2>The Importance of Model Interpretability</h2>
        <p>As machine learning models become more complex and are deployed in critical business applications, the need for interpretability has never been greater. This article explores practical strategies for making your models more explainable.</p>
        
        <h2>Types of Interpretability</h2>
        <ul>
          <li><strong>Global Interpretability:</strong> Understanding the model's overall behavior</li>
          <li><strong>Local Interpretability:</strong> Explaining individual predictions</li>
        </ul>

        <blockquote>
          <p>The best interpretable model is often not the most accurate one, but the one that stakeholders can trust and act upon.</p>
        </blockquote>
    `
  },
  {
    id: 4,
    slug: "computer-vision-python-intro",
    title: "Getting Started with Computer Vision in Python",
    excerpt: "A beginner-friendly introduction to computer vision concepts and practical implementations using OpenCV and TensorFlow.",
    date: "2024-02-28",
    tags: ["computer-vision", "python", "opencv", "tensorflow"],
    category: "tutorial",
    readTime: "15 min read",
    content: `<h2>Getting Started with Computer Vision</h2><p>A beginner-friendly introduction to computer vision concepts and practical implementations using OpenCV and TensorFlow.</p>`
  },
  {
    id: 5,
    slug: "ai-trends-2024",
    title: "The Future of AI: Trends and Predictions for 2024",
    excerpt: "Analyzing emerging trends in artificial intelligence and what they mean for businesses and developers.",
    date: "2024-02-20",
    tags: ["ai", "trends", "future", "business"],
    category: "opinion",
    readTime: "6 min read",
    content: `<h2>The Future of AI</h2><p>Analyzing emerging trends in artificial intelligence and what they mean for businesses and developers.</p>`
  },
  {
    id: 6,
    slug: "dl-models-edge-deployment",
    title: "Optimizing Deep Learning Models for Edge Deployment",
    excerpt: "Techniques for model compression, quantization, and optimization for deployment on mobile and edge devices.",
    date: "2024-02-15",
    tags: ["deep-learning", "optimization", "edge-computing", "mobile"],
    category: "tutorial",
    readTime: "14 min read",
    content: `<h2>Optimizing for the Edge</h2><p>Techniques for model compression, quantization, and optimization for deployment on mobile and edge devices.</p>`
  },
  {
    id: 7,
    slug: "data-quality-ml-foundation",
    title: "Data Quality: The Foundation of Successful ML Projects",
    excerpt: "Why data quality matters more than algorithms and how to implement effective data validation strategies.",
    date: "2024-02-10",
    tags: ["data-quality", "machine-learning", "best-practices"],
    category: "research",
    readTime: "9 min read",
    content: `<h2>Data Quality First</h2><p>Why data quality matters more than algorithms and how to implement effective data validation strategies.</p>`
  },
  {
    id: 8,
    slug: "realtime-recommendation-systems",
    title: "Building Real-time Recommendation Systems at Scale",
    excerpt: "Architecture patterns and technologies for building recommendation systems that serve millions of users.",
    date: "2024-02-05",
    tags: ["recommendation-systems", "real-time", "scalability", "architecture"],
    category: "tutorial",
    readTime: "16 min read",
    content: `<h2>Real-time Recommendations</h2><p>Architecture patterns and technologies for building recommendation systems that serve millions of users.</p>`
  }
];

export const blogPostsList: Post[] = allPosts.map(p => ({ ...p, author: "Prashant Gupta"}));

export const blogPostsBySlug: Record<string, Post> = blogPostsList.reduce((acc, post) => {
  acc[post.slug] = post;
  return acc;
}, {} as Record<string, Post>);
