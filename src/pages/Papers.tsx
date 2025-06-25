import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowUp, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { loadPapers, getPaperCategories } from "@/data/papersLoader";
import { Paper } from "@/utils/markdownUtils";
import Header from "@/components/Header";

const Papers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [papers, setPapers] = useState<Paper[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allYears, setAllYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load papers data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [papersData, categories] = await Promise.all([
          loadPapers(),
          getPaperCategories()
        ]);
        
        setPapers(papersData);
        setAllCategories(['all', ...categories]);
        
        // Extract unique years from papers
        const years = Array.from(new Set(papersData.map(paper => paper.year.toString()))).sort((a, b) => parseInt(b) - parseInt(a));
        setAllYears(['all', ...years]);
      } catch (error) {
        console.error('Error loading papers data:', error);
        toast({
          title: "Error",
          description: "Failed to load papers. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || paper.category === selectedCategory;
    const matchesYear = selectedYear === "all" || paper.year.toString() === selectedYear;
    return matchesSearch && matchesCategory && matchesYear;
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
        <h1 className="text-4xl font-bold mb-2">Research Papers & Publications</h1>
        <p className="text-lg text-gray-600 dark:text-slate-400">
          Foundational papers that have shaped my understanding of AI and machine learning
        </p>
      </section>

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
            <Card key={paper.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <Link to={`/papers/${paper.slug}`} className="block h-full">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400 mb-2">
                    <span>{paper.journal} {paper.year}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {paper.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {paper.title}
                  </CardTitle>
                  <CardDescription>{paper.authors.join(", ")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 line-clamp-3">
                    {paper.abstract}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Paper Links */}
                  <div className="flex gap-2">
                    {paper.pdfUrl && (
                      <Button asChild size="sm" variant="outline">
                        <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
                          PDF
                        </a>
                      </Button>
                    )}
                    {paper.arxivUrl && (
                      <Button asChild size="sm" variant="outline">
                        <a href={paper.arxivUrl} target="_blank" rel="noopener noreferrer">
                          arXiv
                        </a>
                      </Button>
                    )}
                    {paper.doi && (
                      <Button asChild size="sm" variant="outline">
                        <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer">
                          DOI
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Link>
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
