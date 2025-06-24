import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowUp, Search, Filter, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { blogPostsList } from "@/data/blogData";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    }
    
    // Check for tag in URL params
    const params = new URLSearchParams(location.search);
    const tagParam = params.get('tag');
    if (tagParam) {
      setSelectedTag(tagParam);
    }
  }, [location.search]);

  const allTags = ["all", ...Array.from(new Set(blogPostsList.flatMap(post => post.tags)))];
  const allCategories = ["all", ...Array.from(new Set(blogPostsList.map(post => post.category)))];

  const filteredPosts = blogPostsList.filter(post => {
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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prashant Gupta
            </Link>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

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
            <span>Filters</span>
            {showMobileFilters ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
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
              Showing {filteredPosts.length} of {blogPostsList.length} posts
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group flex flex-col overflow-hidden rounded-lg border dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">
                  <CardContent className="flex-grow p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-slate-400 mb-2">
                      <span>{post.date}</span>
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <Link to={`/blog/${post.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
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
