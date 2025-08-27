import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Shield, Search, Filter, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useProducts } from '../../contexts/ProductsContext';

const VENDORS_PER_PAGE = 12;

export function VendorDirectoryPage() {
  const { vendors, categories } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort vendors
  const filteredVendors = vendors
    .filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategories = selectedCategories.length === 0 ||
                               selectedCategories.some(cat => vendor.categories.includes(cat));
      const matchesLocation = !selectedLocation || selectedLocation === 'all-locations' || vendor.location === selectedLocation;
      const matchesVerified = !verifiedOnly || vendor.verified;
      const matchesRating = !selectedRating || selectedRating === 'any-rating' || vendor.rating >= parseFloat(selectedRating);
      
      return matchesSearch && matchesCategories && matchesLocation && matchesVerified && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'location':
          return a.location.localeCompare(b.location);
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        case 'newest':
          return 0; // Keep original order for newest
        case 'rating':
        default:
          return b.rating - a.rating;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredVendors.length / VENDORS_PER_PAGE);
  const startIndex = (currentPage - 1) * VENDORS_PER_PAGE;
  const paginatedVendors = filteredVendors.slice(startIndex, startIndex + VENDORS_PER_PAGE);

  const locations = Array.from(new Set(vendors.map(v => v.location))).sort();

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedLocation('');
    setSelectedRating('');
    setVerifiedOnly(false);
    setSortBy('rating');
    setCurrentPage(1);
  };

  // Reset to first page when filters change
  const handleFilterChange = (filterFn: () => void) => {
    filterFn();
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Vendor Directory</h1>
          <p className="text-gray-600 mb-6">
            Discover trusted suppliers for all your building material needs across South Africa
          </p>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-lg relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search vendors by name or specialization..."
                value={searchTerm}
                onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
                className="w-full pl-10"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={(value) => handleFilterChange(() => setSortBy(value))}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="newest">Newest Vendors</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`w-full lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear
                  </Button>
                </div>

                {/* Location */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium">Location</h4>
                  <Select value={selectedLocation} onValueChange={(value) => handleFilterChange(() => setSelectedLocation(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-locations">All locations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium">Minimum Rating</h4>
                  <Select value={selectedRating} onValueChange={(value) => handleFilterChange(() => setSelectedRating(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any-rating">Any rating</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.0">4.0+ Stars</SelectItem>
                      <SelectItem value="3.5">3.5+ Stars</SelectItem>
                      <SelectItem value="3.0">3.0+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Categories */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium">Specializations</h4>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => handleCategoryToggle(category.name)}
                        />
                        <Label htmlFor={category.id} className="text-sm">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Only */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={verifiedOnly}
                    onCheckedChange={(checked) => handleFilterChange(() => setVerifiedOnly(checked as boolean))}
                  />
                  <Label htmlFor="verified" className="text-sm">
                    Verified vendors only
                  </Label>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Vendors Grid/List */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + VENDORS_PER_PAGE, filteredVendors.length)} of {filteredVendors.length} vendors
              </div>
              {totalPages > 1 && (
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </div>

            {filteredVendors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No vendors found matching your criteria.</p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedVendors.map((vendor) => (
                  <Card key={vendor.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Link to={`/vendors/${vendor.id}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                            {vendor.logo}
                          </div>
                          {vendor.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {vendor.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {vendor.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(vendor.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">
                            {vendor.rating} ({vendor.totalReviews} reviews)
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{vendor.location}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-1">Top 3 Categories:</div>
                        <div className="flex flex-wrap gap-1">
                          {vendor.categories.slice(0, 3).map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                          {vendor.categories.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{vendor.categories.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Link to={`/vendors/${vendor.id}`}>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                          View Store
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {paginatedVendors.map((vendor) => (
                  <Card key={vendor.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-6">
                        <Link to={`/vendors/${vendor.id}`} className="flex-shrink-0">
                          <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center text-3xl">
                            {vendor.logo}
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <Link to={`/vendors/${vendor.id}`}>
                              <h3 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors">
                                {vendor.name}
                              </h3>
                            </Link>
                            {vendor.verified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <Shield className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {vendor.description}
                          </p>

                          <div className="flex items-center space-x-6 mb-3">
                            <div className="flex items-center space-x-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(vendor.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 ml-1">
                                {vendor.rating} ({vendor.totalReviews} reviews)
                              </span>
                            </div>

                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{vendor.location}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {vendor.categories.slice(0, 4).map((category) => (
                              <Badge key={category} variant="secondary" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                            {vendor.categories.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{vendor.categories.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <Link to={`/vendors/${vendor.id}`}>
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                              View Store
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(pageNum)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}