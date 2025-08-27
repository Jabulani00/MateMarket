import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Star, ShoppingCart, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { useProducts } from '../../contexts/ProductsContext';
import { useCart } from '../../contexts/CartContext';
import { FavoriteButton } from '../common/FavoriteButton';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

export function ProductListingPage() {
  const { 
    filteredProducts, 
    categories, 
    searchTerm, 
    setSearchTerm, 
    filters, 
    setFilters, 
    sortBy, 
    setSortBy,
    clearFilters,
    getVendorById
  } = useProducts();
  const { addItem } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Get vendor from URL params
  const vendorId = searchParams.get('vendor');
  const activeVendor = vendorId ? getVendorById(vendorId) : null;

  // Set vendor filter based on URL parameter
  useEffect(() => {
    if (vendorId && vendorId !== filters.vendor) {
      setFilters({ vendor: vendorId });
    }
  }, [vendorId, filters.vendor, setFilters]);

  // Set category filter based on URL parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== filters.category) {
      setFilters({ category: categoryParam });
    }
  }, [searchParams, filters.category, setFilters]);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      vendor: product.vendor,
      maxQuantity: product.stockQuantity
    });
    
    toast.success(`Added ${product.name} to cart`);
  };

  const clearVendorFilter = () => {
    setFilters({ vendor: undefined });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        {activeVendor && (
          <div className="mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/vendors">Vendors</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/vendors/${activeVendor.id}`}>{activeVendor.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {activeVendor ? `${activeVendor.name} Products` : 'Building Materials'}
          </h1>

          {/* Active vendor filter notice */}
          {activeVendor && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg">
                    {activeVendor.logo}
                  </div>
                  <div>
                    <p className="text-sm text-orange-800">
                      Showing products from <span className="font-medium">{activeVendor.name}</span>
                    </p>
                    <p className="text-xs text-orange-600">{activeVendor.location}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearVendorFilter}
                  className="text-orange-600 hover:bg-orange-100"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear filter
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <Input
                type="text"
                placeholder={activeVendor ? `Search in ${activeVendor.name}...` : "Search products..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
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

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
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

                {/* Categories */}
                <div className="space-y-3">
                  <h4 className="font-medium">Categories</h4>
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={filters.category === category.name}
                        onCheckedChange={(checked) => {
                          setFilters({ category: checked ? category.name : undefined });
                        }}
                      />
                      <Label htmlFor={category.id} className="text-sm">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <h4 className="font-medium">Price Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice || ''}
                      onChange={(e) => setFilters({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice || ''}
                      onChange={(e) => setFilters({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                    />
                  </div>
                </div>

                {/* In Stock */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={filters.inStock || false}
                    onCheckedChange={(checked) => setFilters({ inStock: checked as boolean })}
                  />
                  <Label htmlFor="inStock" className="text-sm">
                    In Stock Only
                  </Label>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredProducts.length} products
              {activeVendor && <span> from {activeVendor.name}</span>}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                    <Link to={`/products/${product.id}`}>
                      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
                        <ImageWithFallback
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">Out of Stock</span>
                          </div>
                        )}
                        {product.comparePrice && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                          </Badge>
                        )}
                        <div className="absolute top-2 right-2">
                          <FavoriteButton 
                            product={{
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.images[0],
                              vendor: product.vendor,
                              category: product.category,
                              rating: product.rating,
                              reviewCount: product.reviewCount,
                              location: product.location,
                            }}
                            className="bg-white shadow-md hover:bg-gray-50"
                            size="sm"
                          />
                        </div>
                      </div>
                    </Link>
                    
                    <CardContent className="p-4">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-orange-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center space-x-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">
                          ({product.reviewCount})
                        </span>
                      </div>
                      
                      {!activeVendor && (
                        <Link to={`/vendors/${product.vendor.id}`}>
                          <p className="text-xs text-gray-600 mb-3 hover:text-orange-600">
                            by {product.vendor.name}
                          </p>
                        </Link>
                      )}
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-orange-600">
                            R{product.price.toFixed(2)}
                          </span>
                          {product.comparePrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              R{product.comparePrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <Badge variant="secondary">{product.location}</Badge>
                      </div>
                      
                      <Button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={!product.inStock}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Link to={`/products/${product.id}`} className="flex-shrink-0">
                          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        
                        <div className="flex-1 min-w-0">
                          <Link to={`/products/${product.id}`}>
                            <h3 className="font-medium text-gray-900 hover:text-orange-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-gray-600 ml-1">
                                ({product.reviewCount})
                              </span>
                            </div>
                            {!activeVendor && (
                              <Link to={`/vendors/${product.vendor.id}`}>
                                <Badge variant="outline" className="hover:bg-gray-50">
                                  {product.vendor.name}
                                </Badge>
                              </Link>
                            )}
                            <Badge variant="secondary">{product.location}</Badge>
                            {!product.inStock && (
                              <Badge variant="destructive">Out of Stock</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                          <div className="text-right">
                            <span className="text-xl font-bold text-orange-600">
                              R{product.price.toFixed(2)}
                            </span>
                            {product.comparePrice && (
                              <div className="text-sm text-gray-500 line-through">
                                R{product.comparePrice.toFixed(2)}
                              </div>
                            )}
                          </div>
                          <Button
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={!product.inStock}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                            size="sm"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}