import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

// Route-based code splitting - industry standard approach
const Index = lazy(() => import("./pages/Index"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Papers = lazy(() => import("./pages/Papers"));
const PaperDetail = lazy(() => import("./pages/PaperDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Route loading shimmer
const LoadingShimmer = () => (
  <div className="min-h-screen bg-background">
    <div className="sticky top-0 z-40 h-[65px] border-b border-border bg-background" />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-4">
      <div className="shimmer h-8 w-2/3 rounded" />
      <div className="shimmer h-5 w-full rounded" />
      <div className="shimmer h-5 w-5/6 rounded" />
      <div className="shimmer h-5 w-4/5 rounded" />
    </div>
  </div>
);

const App = () => (
  <ErrorBoundary>
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Suspense fallback={<LoadingShimmer />}>
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/papers" element={<Papers />} />
            <Route path="/papers/:slug" element={<PaperDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
  </ErrorBoundary>
);

export default App;
