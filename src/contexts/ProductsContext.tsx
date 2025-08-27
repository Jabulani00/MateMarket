import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Vendor, Category, products as mockProducts, vendors as mockVendors, categories as mockCategories, filterProducts, sortProducts } from '../data/mockData';

interface ProductFilters {
  category?: string;
  subcategory?: string;
  vendor?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

interface ProductsContextType {
  // Data
  products: Product[];
  vendors: Vendor[];
  categories: Category[];
  
  // Filtered and sorted products
  filteredProducts: Product[];
  
  // Search and filters
  searchTerm: string;
  filters: ProductFilters;
  sortBy: 'price-low' | 'price-high' | 'rating' | 'name' | 'newest';
  
  // Actions
  setSearchTerm: (term: string) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  setSortBy: (sort: 'price-low' | 'price-high' | 'rating' | 'name' | 'newest') => void;
  clearFilters: () => void;
  
  // Getters
  getProductById: (id: string) => Product | undefined;
  getVendorById: (id: string) => Vendor | undefined;
  getVendorProducts: (vendorId: string) => Product[];
  getFeaturedProducts: () => Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products] = useState<Product[]>(mockProducts);
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [categories] = useState<Category[]>(mockCategories);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating' | 'name' | 'newest'>('newest');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Update filtered products whenever search term, filters, or sort changes
  useEffect(() => {
    let filtered = filterProducts(products, { ...filters, search: searchTerm });
    filtered = sortProducts(filtered, sortBy);
    setFilteredProducts(filtered);
  }, [
    products, 
    searchTerm, 
    sortBy,
    filters.category,
    filters.subcategory,
    filters.vendor,
    filters.location,
    filters.minPrice,
    filters.maxPrice,
    filters.inStock
  ]);

  const handleSetFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setSortBy('newest');
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getVendorById = (id: string): Vendor | undefined => {
    return vendors.find(vendor => vendor.id === id);
  };

  const getVendorProducts = (vendorId: string): Product[] => {
    return products.filter(product => product.vendor.id === vendorId);
  };

  const getFeaturedProducts = (): Product[] => {
    return products.filter(product => product.featured);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        vendors,
        categories,
        filteredProducts,
        searchTerm,
        filters,
        sortBy,
        setSearchTerm,
        setFilters: handleSetFilters,
        setSortBy,
        clearFilters,
        getProductById,
        getVendorById,
        getVendorProducts,
        getFeaturedProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}