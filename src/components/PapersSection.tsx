
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const PapersSection = () => {
  const [papersSearchTerm, setPapersSearchTerm] = useState("");
  const [selectedPaperCategory, setSelectedPaperCategory] = useState("all");
  const { toast } = useToast();

  // Papers data
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
    }
  ];

  const allPaperCategories = ["all", ...Array.from(new Set(papers.map(paper => paper.category)))];

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(papersSearchTerm.toLowerCase()) ||
                         paper.authors.toLowerCase().includes(papersSearchTerm.toLowerCase()) ||
                         paper.description.toLowerCase().includes(papersSearchTerm.toLowerCase());
    const matchesCategory = selectedPaperCategory === "all" || paper.category === selectedPaperCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePaperClick = (paperTitle: string) => {
    toast({
      title: "Research Paper",
      description: `Opening: ${paperTitle}`,
    });
    console.log(`Opening paper: ${paperTitle}`);
  };

  return (
    <section id="papers" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Papers & Publications</h2>
        <Link to="/papers">
          <Button variant="outline">
            View All Papers
            <FileText className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
      
      {/* Papers Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search papers..."
            value={papersSearchTerm}
            onChange={(e) => setPapersSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedPaperCategory}
          onChange={(e) => setSelectedPaperCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
        >
          {allPaperCategories.map(category => (
            <option key={category} value={category}>
              {category === "all" ? "All Categories" : category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {filteredPapers.slice(0, 2).map((paper) => (
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
    </section>
  );
};

export default PapersSection;
