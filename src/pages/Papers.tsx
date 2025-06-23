import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowUp, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Papers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
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

  // Extended papers data
  const papers = [
    {
      id: 1,
      title: "Attention Is All You Need",
      authors: "Vaswani et al.",
      description: "Revolutionary paper that introduced the Transformer architecture, fundamentally changing how we approach sequence modeling in NLP.",
      year: "2017",
      venue: "NIPS",
      category: "nlp",
      tags: ["NLP", "Deep Learning", "Transformers"],
      url: "#"
    },
    {
      id: 2,
      title: "BERT: Pre-training Deep Bidirectional Representations",
      authors: "Devlin et al.",
      description: "Groundbreaking work on bidirectional training of Transformers that set new standards for NLP tasks.",
      year: "2018",
      venue: "NAACL",
      category: "nlp",
      tags: ["BERT", "Pre-training", "NLP"],
      url: "#"
    },
    {
      id: 3,
      title: "ResNet: Deep Residual Learning for Image Recognition",
      authors: "He et al.",
      description: "Introduction of residual connections that enabled training of much deeper neural networks.",
      year: "2016",
      venue: "CVPR",
      category: "computer-vision",
      tags: ["Computer Vision", "ResNet", "Deep Learning"],
      url: "#"
    },
    {
      id: 4,
      title: "Generative Adversarial Networks",
      authors: "Goodfellow et al.",
      description: "Original paper introducing GANs, a revolutionary approach to generative modeling.",
      year: "2014",
      venue: "NIPS",
      category: "machine-learning",
      tags: ["GANs", "Generative Models", "Deep Learning"],
      url: "#"
    },
    {
      id: 5,
      title: "XGBoost: A Scalable Tree Boosting System",
      authors: "Chen & Guestrin",
      description: "Highly efficient and scalable gradient boosting framework that dominated ML competitions.",
      year: "2016",
      venue: "KDD",
      category: "machine-learning",
      tags: ["XGBoost", "Gradient Boosting", "Machine Learning"],
      url: "#"
    },
    {
      id: 6,
      title: "Dropout: A Simple Way to Prevent Neural Networks from Overfitting",
      authors: "Srivastava et al.",
      description: "Simple yet effective regularization technique that became standard in deep learning.",
      year: "2014",
      venue: "JMLR",
      category: "machine-learning",
      tags: ["Dropout", "Regularization", "Deep Learning"],
      url: "#"
    }
  ];

  const allCategories = ["all", ...Array.from(new Set(papers.map(paper => paper.category)))];
  const allYears = ["all", ...Array.from(new Set(papers.map(paper => paper.year))).sort().reverse()];

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || paper.category === selectedCategory;
    const matchesYear = selectedYear === "all" || paper.year === selectedYear;
    return matchesSearch && matchesCategory && matchesYear;
  });

  const handlePaperClick = (paperTitle: string) => {
    toast({
      title: "Research Paper",
      description: `Opening: ${paperTitle}`,
    });
    console.log(`Opening paper: ${paperTitle}`);
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
          <h1 className="text-4xl font-bold mt-4 mb-2">Research Papers & Publications</h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">
            Foundational papers that have shaped my understanding of AI and machine learning
          </p>
        </div>
      </header>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
          >
            {allCategories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
          >
            {allYears.map(year => (
              <option key={year} value={year}>
                {year === "all" ? "All Years" : year}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">
          Showing {filteredPapers.length} of {papers.length} papers
        </p>

        {/* Papers Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => handlePaperClick(paper.title)}>
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400 mb-2">
                  <span>{paper.venue} {paper.year}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{paper.title}</CardTitle>
                <CardDescription>{paper.authors}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
                  {paper.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-slate-400">No papers found matching your criteria.</p>
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

export default Papers;
