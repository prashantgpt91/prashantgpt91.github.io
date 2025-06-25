import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowUp, Search, Filter, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { loadBlogPosts, getBlogTags, getBlogCategories } from "@/data/blogLoader";
import { BlogPost } from "@/utils/markdownUtils";
import Header from "@/components/Header";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Initialize filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tagParam = params.get('tag');
    if (tagParam) {
      setSelectedTag(tagParam);
    }
  }, [location.search]);

  // Load blog data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [posts, tags, categories] = await Promise.all([
          loadBlogPosts(),
          getBlogTags(),
          getBlogCategories()
        ]);
        
        setBlogPosts(posts);
        setAllTags(['all', ...tags]);
        setAllCategories(['all', ...categories]);
      } catch (error) {
        console.error('Error loading blog data:', error);
        toast({
          title: "Error",
          description: "Failed to load blog posts. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading blog posts...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Blog Archive</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">Insights, tutorials, and thoughts on data science, AI, and machine learning.</p>
        </div>

        {/* Mobile filters toggle */}
        <div className="md:hidden mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex justify-between items-center"
          >
            <span>{showMobileFilters ? "Hide Filters" : "Show Filters"}</span>
            {showMobileFilters ? <X className="h-4 w-4 ml-2" /> : <Filter className="h-4 w-4 ml-2" />}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} md:block md:col-span-1`}>
            <div className="sticky top-24 bg-white dark:bg-slate-950 p-4 rounded-lg border border-gray-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Category</label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {allCategories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="tag" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Tag</label>
                  <select
                    id="tag"
                    value={selectedTag}
                    onChange={(e) => {
                      setSelectedTag(e.target.value);
                      // Update URL when tag changes
                      const params = new URLSearchParams(location.search);
                      if (e.target.value === "all") {
                        params.delete('tag');
                      } else {
                        params.set('tag', e.target.value);
                      }
                      navigate({ search: params.toString() });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>
                        {tag === "all" ? "All Tags" : tag.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Blog Posts Grid */}
          <div className="md:col-span-3">
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
              Showing {filteredPosts.length} of {blogPosts.length} posts
            </p>
            {filteredPosts.length === 0 ? (
              <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-8 text-center">
                <p className="text-gray-500 dark:text-slate-400">No posts found matching your filters.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTag('all');
                    setSelectedCategory('all');
                    navigate('/blog');
                  }}
                  className="mt-2"
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="group flex flex-col overflow-hidden rounded-lg border dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer"
                  onClick={(e) => {
                    // Don't navigate if clicking on a tag
                    if (!(e.target as HTMLElement).closest('.tag-badge')) {
                      navigate(`/blog/${post.slug}`);
                    }
                  }}
                >
                  <CardContent className="flex-grow p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-slate-400 mb-2 gap-2">
                      <span>{post.date}</span>
                      <Badge variant="secondary" className="self-start sm:self-auto">{post.category}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                      {post.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="tag-badge cursor-pointer text-xs sm:text-sm py-0.5 px-2 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedTag(tag);
                            const params = new URLSearchParams(location.search);
                            params.set('tag', tag);
                            navigate({ search: params.toString() });
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <div className="bg-gray-50 dark:bg-slate-900 px-6 py-3 text-sm text-gray-500 dark:text-slate-400">
                    <span>{post.readTime}</span>
                  </div>
                </Card>
              ))}
            </div>
            )}
          </div>
        </div>
      </main>

      {/* Scroll to top button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 rounded-full p-4 h-14 w-14 bg-blue-600 hover:bg-blue-700 shadow-lg transition-opacity duration-300"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Blog;
