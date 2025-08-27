import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Vendor {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  location: string;
  categories: string[];
  verified: boolean;
}

interface TopVendorsSectionProps {
  vendors: Vendor[];
}

export function TopVendorsSection({ vendors }: TopVendorsSectionProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Vendors
            </h2>
            <p className="text-xl text-gray-600">
              Trusted suppliers with excellent ratings
            </p>
          </div>
          <Link to="/vendors">
            <Button variant="outline" className="hidden md:flex items-center space-x-2">
              <span>View All Vendors</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Link to={`/vendors/${vendor.id}`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-xl">
                      {vendor.logo}
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                        {vendor.name}
                      </h3>
                      {vendor.verified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">
                    {vendor.rating} ({vendor.reviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {vendor.location}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {vendor.categories.slice(0, 2).map((category, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                  {vendor.categories.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{vendor.categories.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <Link to={`/vendors/${vendor.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Store
                    </Button>
                  </Link>
                  <Link to={`/products?vendor=${vendor.id}`}>
                    <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      <Package className="h-3 w-3 mr-1" />
                      View Products
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/vendors">
            <Button className="bg-orange-500 hover:bg-orange-600">
              View All Vendors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}