import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, FileText, BookOpen } from "lucide-react";
import { getPaper } from "@/data/papersLoader";
import { Paper } from "@/utils/markdownUtils";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Giscus } from "@/components/Giscus";
import PostEngagementBar from "@/components/PostEngagementBar";
import BackToTop from "@/components/BackToTop";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { updatePageMeta } from "@/utils/seo";

const PaperDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [giscusTheme, setGiscusTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const newTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
      setGiscusTheme(newTheme);
    };
    window.addEventListener('theme-change', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);
    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const loadPaper = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      try {
        const paperData = await getPaper(slug);
        setPaper(paperData);
        if (paperData) {
          updatePageMeta({
            title: paperData.title,
            description: paperData.abstract,
            path: `/papers/${slug}`,
          });
        }
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
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Paper Not Found</h1>
          <p className="text-muted-foreground mb-6">The paper you're looking for doesn't exist.</p>
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
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <ReadingProgressBar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Button */}
        <Link to="/papers" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Papers
        </Link>

        {/* Paper Header */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{paper.title}</h1>

          <p className="text-lg text-muted-foreground mb-4">
            {paper.authors.join(", ")}
          </p>

          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><span className="font-semibold">Published in:</span> {paper.journal}</div>
              <div><span className="font-semibold">Year:</span> {paper.year}</div>
              {paper.volume && <div><span className="font-semibold">Volume:</span> {paper.volume}</div>}
              {paper.pages && <div><span className="font-semibold">Pages:</span> {paper.pages}</div>}
              {paper.citations && <div><span className="font-semibold">Citations:</span> {paper.citations}</div>}
              <div><Badge variant="secondary" className="capitalize">{paper.category}</Badge></div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Abstract</h3>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{paper.abstract}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {paper.keywords.map((keyword, index) => (
                <Badge key={index} variant="outline">{keyword}</Badge>
              ))}
            </div>
          </div>

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

        {/* Bottom engagement bar */}
        <div className="border-y border-border py-1 mt-12 mb-10">
          <PostEngagementBar title={paper.title} />
        </div>

        {/* Comments */}
        <section id="comments" className="pt-8 border-t border-border">
          <h2 className="text-lg font-semibold mb-4">Comments</h2>
          <Giscus
            repo="prashantgpt91/prashantgpt91.github.io"
            repoId="MDEwOlJlcG9zaXRvcnk4NzczMjkyMw=="
            category="General"
            categoryId="DIC_kwDOBTqyu84Cr7SZ"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={giscusTheme}
            lang="en"
          />
        </section>

        <BackToTop />
      </div>
    </div>
  );
};

export default PaperDetail;
