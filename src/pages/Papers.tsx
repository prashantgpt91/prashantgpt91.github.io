import { useState, useEffect } from "react";
import { Search, Calendar, ExternalLink, FileText, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Pagination, PageSizeSelector } from "@/components/Pagination";
import DateFilter, { DateRange } from "@/components/DateFilter";
import FilterDropdown from "@/components/FilterDropdown";
import { getPaginatedPapers, getPaperCategories } from "@/data/papersLoader";
import { Paper } from "@/utils/markdownUtils";
import { PaginationResult, PAGINATION_SIZES } from "@/utils/paginationUtils";
import { useNavigate, useSearchParams } from "react-router-dom";

const Papers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [paginatedPapers, setPaginatedPapers] = useState<PaginationResult<Omit<Paper, 'content'>> | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [allYears, setAllYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // URL-based state
  const currentPage = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('size') || PAGINATION_SIZES.SMALL.toString());
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedStatus = searchParams.get('status') || 'all';
  const searchTerm = searchParams.get('search') || '';
  const dateStart = searchParams.get('dateStart') || '';
  const dateEnd = searchParams.get('dateEnd') || '';

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [papersResult, categoriesData] = await Promise.all([
          getPaginatedPapers(currentPage, pageSize, selectedCategory, selectedStatus, searchTerm),
          getPaperCategories()
        ]);
        
        setPaginatedPapers(papersResult);
        setCategories(['all', ...categoriesData]);
        
        // Extract years from papers for date filtering
        const years = Array.from(new Set(
          papersResult.items.map(paper => paper.year.toString())
        )).sort((a, b) => parseInt(b) - parseInt(a));
        setAllYears(['all', ...years]);
      } catch (error) {
        console.error('Error loading papers data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, pageSize, selectedCategory, selectedStatus, searchTerm, dateStart, dateEnd]);

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

  const handleStatusChange = (status: string) => {
    updateSearchParams({ status, page: 1 });
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

  const handlePaperClick = (slug: string, event: React.MouseEvent) => {
    // Prevent navigation if clicking on a badge or external link
    if ((event.target as HTMLElement).closest('.badge-clickable, .external-link')) {
      return;
    }
    navigate(`/papers/${slug}`);
  };

  // Count active filters
  const activeFiltersCount = [
    selectedCategory !== 'all' ? 1 : 0,
    selectedStatus !== 'all' ? 1 : 0,
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
            Research Papers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Academic publications, research contributions, and papers in machine learning, AI, and computer science.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search papers..."
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

            {/* Status Filter */}
            <FilterDropdown
              label="Status"
              options={['all', 'published', 'under-review', 'draft']}
              selectedValue={selectedStatus}
              onValueChange={handleStatusChange}
              placeholder="All Status"
              formatLabel={(option) => option === 'all' ? 'All Status' : option.replace('-', ' ').charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
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
        {paginatedPapers && (
          <div className="text-center mb-6 text-sm text-gray-600 dark:text-gray-400">
            {searchTerm && `Search results for "${searchTerm}" • `}
            {selectedCategory !== 'all' && `Category: ${selectedCategory} • `}
            {selectedStatus !== 'all' && `Status: ${selectedStatus} • `}
            {(dateStart || dateEnd) && `Date filtered • `}
            {paginatedPapers.totalItems} papers found
          </div>
        )}

        {/* Papers Grid */}
        {paginatedPapers && paginatedPapers.items.length > 0 ? (
          <div className="grid gap-6 md:gap-8 mb-12">
            {paginatedPapers.items.map((paper) => (
              <article
                key={paper.id}
                className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={(e) => handlePaperClick(paper.slug, e)}
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={paper.status === 'published' ? 'default' : 
                                paper.status === 'under-review' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {paper.status}
                      </Badge>
                      {paper.featured && (
                        <Badge variant="default" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {paper.year}
                      </div>
                      {paper.citations && (
                        <div className="flex items-center gap-1">
                          <span>{paper.citations} citations</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {paper.title}
                  </h3>
                  
                  {/* Authors */}
                  {paper.authors && paper.authors.length > 0 && (
                    <div className="flex items-center gap-1 mb-3 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      <span className="line-clamp-1">
                        {paper.authors.join(', ')}
                      </span>
                    </div>
                  )}
                  
                  {/* Journal/Venue */}
                  {paper.journal && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 italic">
                      {paper.journal}
                      {paper.volume && `, Vol. ${paper.volume}`}
                      {paper.pages && `, pp. ${paper.pages}`}
                    </div>
                  )}
                  
                  {/* Abstract */}
                  {paper.abstract && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                      {paper.abstract}
                    </p>
                  )}
                  
                  {/* Keywords */}
                  {paper.keywords && paper.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {paper.keywords.slice(0, 5).map((keyword) => (
                        <Badge
                          key={keyword}
                          variant="outline"
                          className="badge-clickable text-xs"
                        >
                          {keyword}
                        </Badge>
                      ))}
                      {paper.keywords.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{paper.keywords.length - 5}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {/* External Links */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {paper.arxivUrl && (
                      <a
                        href={paper.arxivUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FileText className="h-3 w-3" />
                        arXiv
                      </a>
                    )}
                    {paper.pdfUrl && (
                      <a
                        href={paper.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FileText className="h-3 w-3" />
                        PDF
                      </a>
                    )}
                    {paper.doi && (
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-3 w-3" />
                        DOI
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {activeFiltersCount > 0 ? 
                'No papers found matching your criteria.' : 'No papers available.'}
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
        {paginatedPapers && paginatedPapers.totalPages > 1 && (
          <Pagination
            pagination={paginatedPapers}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        )}
      </div>
    </div>
  );
};

export default Papers;
