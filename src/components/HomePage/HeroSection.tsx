import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { popularSearchTerms } from './constants';

interface HeroSectionProps {
  heroImage: string;
}

export function HeroSection({ heroImage }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section 
      className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20"
      style={{
        backgroundImage: heroImage ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${heroImage})` : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            South Africa's Premier
            <span className="text-orange-500 block">Building Materials Marketplace</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Connect with verified suppliers, compare prices, and get quality building materials delivered nationwide
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for cement, steel, tiles, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-gray-900 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="flex-shrink-0">
                <Button 
                  size="lg"
                  className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 px-8"
                >
                  Search Materials
                </Button>
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-6">
            <p className="text-gray-300 mb-3">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearchTerms.map((term) => (
                <Link
                  key={term}
                  to={`/products?search=${term}`}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}