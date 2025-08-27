import { useState, useEffect } from 'react';
import { HeroSection } from './HomePage/HeroSection';
import { StatsSection } from './HomePage/StatsSection';
import { CategoriesSection } from './HomePage/CategoriesSection';
import { FeaturedProductsSection } from './HomePage/FeaturedProductsSection';
import { TopVendorsSection } from './HomePage/TopVendorsSection';
import { TrustSection } from './HomePage/TrustSection';
import { CTASection } from './HomePage/CTASection';
import { useProducts } from '../contexts/ProductsContext';

export function HomePage() {
  const { getFeaturedProducts, vendors } = useProducts();
  const [heroImage, setHeroImage] = useState('');

  // Get actual featured products and top vendors from context
  const featuredProducts = getFeaturedProducts();
  
  // Transform vendors to match the expected interface and get top 4 highest rated
  const topVendors = vendors
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
    .map(vendor => ({
      id: vendor.id,
      name: vendor.name,
      logo: vendor.logo,
      rating: vendor.rating,
      reviews: vendor.totalReviews,
      location: vendor.location,
      categories: vendor.categories,
      verified: vendor.verified
    }));

  useEffect(() => {
    // Load hero image
    const loadHeroImage = async () => {
      try {
        // Note: unsplash_tool would be imported and used here in a real implementation
        // For now, using placeholder
        setHeroImage('');
      } catch (error) {
        console.error('Failed to load hero image:', error);
      }
    };

    loadHeroImage();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection heroImage={heroImage} />
      <StatsSection />
      <CategoriesSection />
      <FeaturedProductsSection products={featuredProducts} />
      <TopVendorsSection vendors={topVendors} />
      <TrustSection />
      <CTASection />
    </div>
  );
}