export const categories = [
  { name: 'Cement & Concrete', icon: '🏗️', count: 2456 },
  { name: 'Roofing Materials', icon: '🏠', count: 1567 },
  { name: 'Plumbing & Pipes', icon: '🔧', count: 2134 },
  { name: 'Electrical', icon: '⚡', count: 1876 },
  { name: 'Tools & Hardware', icon: '🔨', count: 3298 },
  { name: 'Paint & Finishes', icon: '🎨', count: 1654 }
];

export const mockFeaturedProducts = [
  {
    id: '1',
    name: 'Premium Cement 42.5N',
    price: 89.99,
    comparePrice: 109.99,
    image: '',
    vendor: 'BuildCorp Supplies',
    rating: 4.8,
    reviews: 156,
    location: 'Johannesburg'
  },
  {
    id: '2', 
    name: 'Steel Reinforcement Bars',
    price: 245.50,
    image: '',
    vendor: 'Metal Masters',
    rating: 4.9,
    reviews: 203,
    location: 'Cape Town'
  },
  {
    id: '3',
    name: 'Ceramic Floor Tiles',
    price: 399.99,
    comparePrice: 449.99,
    image: '',
    vendor: 'Tile World',
    rating: 4.7,
    reviews: 89,
    location: 'Durban'
  },
  {
    id: '4',
    name: 'Waterproofing Membrane',
    price: 159.99,
    image: '',
    vendor: 'ProBuild Solutions',
    rating: 4.6,
    reviews: 124,
    location: 'Pretoria'
  }
];

export const mockTopVendors = [
  {
    id: '1',
    name: 'BuildCorp Supplies',
    logo: '',
    rating: 4.9,
    reviews: 1250,
    location: 'Johannesburg',
    categories: ['Cement', 'Aggregates', 'Tools'],
    verified: true
  },
  {
    id: '2',
    name: 'Metal Masters',
    logo: '',
    rating: 4.8,
    reviews: 980,
    location: 'Cape Town', 
    categories: ['Steel', 'Aluminium', 'Hardware'],
    verified: true
  },
  {
    id: '3',
    name: 'Tile World',
    logo: '',
    rating: 4.7,
    reviews: 756,
    location: 'Durban',
    categories: ['Tiles', 'Flooring', 'Bathroom'],
    verified: true
  },
  {
    id: '4',
    name: 'ProBuild Solutions',
    logo: '',
    rating: 4.6,
    reviews: 642,
    location: 'Pretoria',
    categories: ['Roofing', 'Insulation', 'Waterproofing'],
    verified: false
  }
];

export const popularSearchTerms = ['Cement', 'Steel bars', 'Roof tiles', 'PVC pipes', 'Paint'];