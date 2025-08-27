import { Link } from 'react-router-dom';
import { Star, MapPin, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { FavoriteButton } from '../common/FavoriteButton';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { toast } from 'sonner';

interface Vendor {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  totalReviews: number;
  location: string;
  verified: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  images: string[];
  vendor: Vendor;
  rating: number;
  reviewCount: number;
  location: string;
  featured?: boolean;
}

interface FeaturedProductsSectionProps {
  products: Product[];
}

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const { addItem } = useCart();
  
  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '/api/placeholder/300/200',
      vendor: {
        id: product.vendor.id,
        name: product.vendor.name,
      },
    });
    toast.success('Added to cart');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Top-rated building materials from verified suppliers
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="hidden md:flex items-center space-x-2">
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Link to={`/products/${product.id}`}>
                  <div className="relative">
                    <ImageWithFallback
                      src={product.images?.[0] || '/api/placeholder/300/200'}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.comparePrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                      </Badge>
                    )}
                    <div className="absolute top-2 right-2">
                      <FavoriteButton 
                        product={{
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.images?.[0] || '/api/placeholder/300/200',
                          vendor: {
                            id: product.vendor.id,
                            name: product.vendor.name,
                          },
                          category: 'Building Materials', // Default category for homepage
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
                
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  <Link to={`/vendors/${product.vendor.id}`}>
                    <p className="text-sm text-gray-600 mb-2 flex items-center hover:text-orange-600 transition-colors">
                      <MapPin className="h-3 w-3 mr-1" />
                      {product.vendor.name} • {product.location}
                    </p>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        R{product.price.toFixed(2)}
                      </span>
                      {product.comparePrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          R{product.comparePrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/products">
            <Button className="bg-orange-500 hover:bg-orange-600">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}