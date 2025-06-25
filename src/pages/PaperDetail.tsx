import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, FileText, BookOpen } from "lucide-react";
import { getPaper } from "@/data/papersLoader";
import { Paper } from "@/utils/markdownUtils";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const PaperDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadPaper = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const paperData = await getPaper(slug);
        setPaper(paperData);
      } catch (error) {
        console.error('Error loading paper:', error);
        toast({
          title: "Error",
          description: "Failed to load paper. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPaper();
  }, [slug, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex justify-center items-center">
        <p className="text-lg text-gray-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Paper Not Found</h1>
          <p className="text-gray-600 dark:text-slate-400 mb-6">The paper you're looking for doesn't exist.</p>
          <Link to="/papers">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Papers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/papers" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Papers
        </Link>

        {/* Paper Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{paper.title}</h1>
          
          {/* Authors */}
          <p className="text-lg text-gray-600 dark:text-slate-400 mb-4">
            {paper.authors.join(", ")}
          </p>

          {/* Publication Info */}
          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Published in:</span> {paper.journal}
              </div>
              <div>
                <span className="font-semibold">Year:</span> {paper.year}
              </div>
              {paper.volume && (
                <div>
                  <span className="font-semibold">Volume:</span> {paper.volume}
                </div>
              )}
              {paper.pages && (
                <div>
                  <span className="font-semibold">Pages:</span> {paper.pages}
                </div>
              )}
              {paper.citations && (
                <div>
                  <span className="font-semibold">Citations:</span> {paper.citations}
                </div>
              )}
              <div>
                <Badge variant="secondary" className="capitalize">
                  {paper.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Abstract */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Abstract</h3>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              {paper.abstract}
            </p>
          </div>

          {/* Keywords */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {paper.keywords.map((keyword, index) => (
                <Badge key={index} variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          {/* Paper Links */}
          <div className="flex flex-wrap gap-4">
            {paper.pdfUrl && (
              <Button asChild variant="default">
                <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  Read PDF
                </a>
              </Button>
            )}
            {paper.arxivUrl && (
              <Button asChild variant="outline">
                <a href={paper.arxivUrl} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="w-4 h-4 mr-2" />
                  arXiv
                </a>
              </Button>
            )}
            {paper.doi && (
              <Button asChild variant="outline">
                <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  DOI
                </a>
              </Button>
            )}
          </div>
        </header>

        {/* Paper Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownRenderer content={paper.content} />
        </div>
      </div>
    </div>
  );
};

export default PaperDetail;
