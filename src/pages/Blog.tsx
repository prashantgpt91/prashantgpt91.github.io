import { useState, useEffect } from "react";
import { Search, Calendar, ExternalLink, User, Tag, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Pagination, PageSizeSelector } from "@/components/Pagination";
import DateFilter, { DateRange } from "@/components/DateFilter";
import FilterDropdown from "@/components/FilterDropdown";
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
  const [tags, setTags] = useState<string[]>([]);
  const [allYears, setAllYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // URL-based state
  const currentPage = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('size') || PAGINATION_SIZES.MEDIUM.toString());
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedTag = searchParams.get('tag') || 'all';
  const searchTerm = searchParams.get('search') || '';
  const dateStart = searchParams.get('dateStart') || '';
  const dateEnd = searchParams.get('dateEnd') || '';

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [postsResult, categoriesData, tagsData] = await Promise.all([
          getPaginatedBlogPosts(currentPage, pageSize, selectedCategory, selectedTag, searchTerm),
          getBlogCategories(),
          getBlogTags()
        ]);
        
        setPaginatedPosts(postsResult);
        setCategories(['all', ...categoriesData]);
        setTags(['all', ...tagsData]);
        
        // Extract years from posts for date filtering
        const years = Array.from(new Set(
          postsResult.items.map(post => new Date(post.date).getFullYear().toString())
        )).sort((a, b) => parseInt(b) - parseInt(a));
        setAllYears(['all', ...years]);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, pageSize, selectedCategory, selectedTag, searchTerm, dateStart, dateEnd]);

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
    updateSearchParams({ search: value, page: 1 });
  };

  const handleCategoryChange = (category: string) => {
    updateSearchParams({ category, page: 1 });
  };

  const handleTagChange = (tag: string) => {
    updateSearchParams({ tag, page: 1 });
  };

  const handleDateRangeChange = (range: DateRange) => {
    updateSearchParams({ 
      dateStart: range.start || '', 
      dateEnd: range.end || '', 
      page: 1 
    });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page });
  };

  const handlePageSizeChange = (size: number) => {
    updateSearchParams({ size, page: 1 });
  };

  const handlePostClick = (slug: string, event: React.MouseEvent) => {
    // Prevent navigation if clicking on a badge or external link
    if ((event.target as HTMLElement).closest('.badge-clickable, .external-link')) {
      return;
    }
    navigate(`/blog/${slug}`);
  };

  // Count active filters
  const activeFiltersCount = [
    selectedCategory !== 'all' ? 1 : 0,
    selectedTag !== 'all' ? 1 : 0,
    dateStart || dateEnd ? 1 : 0,
    searchTerm ? 1 : 0
  ].reduce((sum, count) => sum + count, 0);

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
            Blog Posts
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on machine learning, AI, software development, and technology.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center flex-wrap">
            {/* Category Filter */}
            <FilterDropdown
              label="Category"
              options={categories}
              selectedValue={selectedCategory}
              onValueChange={handleCategoryChange}
              placeholder="All Categories"
              showCount={categories.length > 10}
            />

            {/* Tag Filter */}
            <FilterDropdown
              label="Tag"
              options={tags}
              selectedValue={selectedTag}
              onValueChange={handleTagChange}
              placeholder="All Tags"
              showCount={tags.length > 10}
            />

            {/* Date Filter */}
            <DateFilter
              value={{ start: dateStart, end: dateEnd }}
              onDateRangeChange={handleDateRangeChange}
              years={allYears}
              className="w-full sm:w-auto"
            />

            {/* Clear All Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchParams(new URLSearchParams())}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Clear all ({activeFiltersCount})
              </Button>
            )}
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
            {selectedCategory !== 'all' && `Category: ${selectedCategory} • `}
            {selectedTag !== 'all' && `Tag: ${selectedTag} • `}
            {(dateStart || dateEnd) && `Date filtered • `}
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {post.category}
                      </Badge>
                      {post.featured && (
                        <Badge variant="default" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      {post.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  {/* Author */}
                  {post.author && (
                    <div className="flex items-center gap-1 mb-3 text-sm text-gray-600 dark:text-gray-400">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  )}
                  
                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4 relative z-10">
                      {post.tags.slice(0, 5).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="badge-clickable text-xs relative"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagChange(tag);
                          }}
                        >
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 5}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {/* External Links */}
                  {(post.demoUrl || post.githubUrl) && (
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {post.demoUrl && (
                        <a
                          href={post.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="external-link flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3" />
                          Demo
                        </a>
                      )}
                      {post.githubUrl && (
                        <a
                          href={post.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="external-link flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3" />
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {activeFiltersCount > 0 ? 
                'No posts found matching your criteria.' : 'No blog posts available.'}
            </p>
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                onClick={() => setSearchParams(new URLSearchParams())}
                className="mt-4"
              >
                Clear all filters
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
