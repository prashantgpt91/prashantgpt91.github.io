import { useState, useEffect } from "react";
import { Search, Filter, Clock, User, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Pagination, PageSizeSelector } from "@/components/Pagination";
import { getPaginatedBlogPosts, getBlogCategories, getBlogTags } from "@/data/blogLoader";
import { BlogPost } from "@/utils/markdownUtils";
import { PaginationResult, PAGINATION_SIZES } from "@/utils/paginationUtils";
import { useNavigate, useSearchParams } from "react-router-dom";

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [paginatedPosts, setPaginatedPosts] = useState<PaginationResult<Omit<BlogPost, 'content'>> | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // URL-based state
  const currentPage = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('size') || PAGINATION_SIZES.MEDIUM.toString());
  const selectedCategory = searchParams.get('category') || 'all';
  const searchTerm = searchParams.get('search') || '';
  const selectedTag = searchParams.get('tag') || '';

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [postsResult, categoriesData, tagsData] = await Promise.all([
          getPaginatedBlogPosts(currentPage, pageSize, selectedCategory, searchTerm || selectedTag),
          getBlogCategories(),
          getBlogTags()
        ]);
        
        setPaginatedPosts(postsResult);
        setCategories(['all', ...categoriesData]);
        setAllTags(tagsData);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, pageSize, selectedCategory, searchTerm, selectedTag]);

  // Update URL parameters
  const updateSearchParams = (updates: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === 'all' || (key === 'page' && value === 1)) {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });
    
    setSearchParams(newParams);
  };

  const handleSearch = (value: string) => {
    updateSearchParams({ search: value, tag: '', page: 1 });
  };

  const handleCategoryChange = (category: string) => {
    updateSearchParams({ category, page: 1 });
  };

  const handleTagClick = (tag: string) => {
    updateSearchParams({ tag, search: '', page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page });
  };

  const handlePageSizeChange = (size: number) => {
    updateSearchParams({ size, page: 1 });
  };

  const handlePostClick = (slug: string, event: React.MouseEvent) => {
    // Prevent navigation if clicking on a tag
    if ((event.target as HTMLElement).closest('.tag-badge')) {
      return;
    }
    navigate(`/blog/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on software development, AI, and technology.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className="capitalize"
              >
                <Filter className="h-3 w-3 mr-1" />
                {category}
              </Button>
            ))}
          </div>

          {/* Page Size Selector */}
          <div className="flex justify-center">
            <PageSizeSelector
              currentPageSize={pageSize}
              pageSizeOptions={[PAGINATION_SIZES.SMALL, PAGINATION_SIZES.MEDIUM, PAGINATION_SIZES.LARGE]}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>

        {/* Results Info */}
        {paginatedPosts && (
          <div className="text-center mb-6 text-sm text-gray-600 dark:text-gray-400">
            {searchTerm && `Search results for "${searchTerm}" • `}
            {selectedTag && `Tagged with "${selectedTag}" • `}
            {selectedCategory !== 'all' && `Category: ${selectedCategory} • `}
            {paginatedPosts.totalItems} posts found
          </div>
        )}

        {/* Blog Posts Grid */}
        {paginatedPosts && paginatedPosts.items.length > 0 ? (
          <div className="grid gap-6 md:gap-8 mb-12">
            {paginatedPosts.items.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={(e) => handlePostClick(post.slug, e)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                    )}
                    {post.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="tag-badge text-xs cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleTagClick(tag);
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchTerm || selectedTag ? 'No posts found matching your criteria.' : 'No blog posts available.'}
            </p>
            {(searchTerm || selectedTag || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchParams(new URLSearchParams());
                }}
                className="mt-4"
              >
                Clear filters
              </Button>
            )}
          </div>
        )}

        {/* Pagination */}
        {paginatedPosts && paginatedPosts.totalPages > 1 && (
          <Pagination
            pagination={paginatedPosts}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        )}
      </div>
    </div>
  );
};

export default Blog;
