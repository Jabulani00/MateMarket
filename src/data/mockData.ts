export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  subcategory: string;
  vendor: Vendor;
  rating: number;
  reviewCount: number;
  location: string;
  inStock: boolean;
  stockQuantity: number;
  specifications: Record<string, string>;
  tags: string[];
  featured?: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  totalReviews: number;
  location: string;
  address: string;
  phone: string;
  email: string;
  categories: string[];
  verified: boolean;
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  policies: {
    returns: string;
    shipping: string;
    warranty: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: 'cement-concrete',
    name: 'Cement & Concrete',
    icon: '🏗️',
    subcategories: ['Portland Cement', 'Ready Mix Concrete', 'Concrete Blocks', 'Additives']
  },
  {
    id: 'roofing',
    name: 'Roofing Materials',
    icon: '🏠',
    subcategories: ['Roof Sheets', 'Tiles', 'Gutters', 'Insulation']
  },
  {
    id: 'plumbing',
    name: 'Plumbing & Pipes',
    icon: '🔧',
    subcategories: ['PVC Pipes', 'Copper Pipes', 'Fittings', 'Fixtures']
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: '⚡',
    subcategories: ['Cables', 'Switches', 'Lighting', 'Distribution Boards']
  },
  {
    id: 'tools',
    name: 'Tools & Hardware',
    icon: '🔨',
    subcategories: ['Hand Tools', 'Power Tools', 'Fasteners', 'Safety Equipment']
  },
  {
    id: 'paint',
    name: 'Paint & Finishes',
    icon: '🎨',
    subcategories: ['Interior Paint', 'Exterior Paint', 'Primers', 'Wood Stains']
  }
];

export const vendors: Vendor[] = [
  {
    id: 'buildit-supplies',
    name: 'BuildIt Supplies',
    logo: '🏢',
    description: 'Premier building materials supplier with over 20 years of experience serving contractors and homeowners across South Africa.',
    rating: 4.8,
    totalReviews: 245,
    location: 'Johannesburg',
    address: '123 Industrial Avenue, Johannesburg, 2000',
    phone: '+27 11 123 4567',
    email: 'info@builditsupplies.co.za',
    categories: ['Cement & Concrete', 'Roofing Materials', 'Tools & Hardware'],
    verified: true,
    businessHours: {
      monday: '7:00 AM - 5:00 PM',
      tuesday: '7:00 AM - 5:00 PM',
      wednesday: '7:00 AM - 5:00 PM',
      thursday: '7:00 AM - 5:00 PM',
      friday: '7:00 AM - 5:00 PM',
      saturday: '8:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    policies: {
      returns: '30-day return policy on unused items',
      shipping: 'Free delivery on orders over R2,500 within 50km',
      warranty: '1-year warranty on power tools, 6 months on hand tools'
    }
  },
  {
    id: 'cape-construction',
    name: 'Cape Construction Materials',
    logo: '⛰️',
    description: 'Specialist in high-quality construction materials for residential and commercial projects in the Western Cape.',
    rating: 4.6,
    totalReviews: 189,
    location: 'Cape Town',
    address: '456 Construction Road, Cape Town, 8000',
    phone: '+27 21 987 6543',
    email: 'sales@capeconst.co.za',
    categories: ['Cement & Concrete', 'Roofing Materials', 'Paint & Finishes'],
    verified: true,
    businessHours: {
      monday: '7:30 AM - 4:30 PM',
      tuesday: '7:30 AM - 4:30 PM',
      wednesday: '7:30 AM - 4:30 PM',
      thursday: '7:30 AM - 4:30 PM',
      friday: '7:30 AM - 4:30 PM',
      saturday: '8:00 AM - 1:00 PM',
      sunday: 'Closed'
    },
    policies: {
      returns: '14-day return policy with receipt',
      shipping: 'Delivery available Monday-Friday, R150 fee within Cape Town',
      warranty: 'Manufacturer warranty applies to all products'
    }
  },
  {
    id: 'durban-hardware',
    name: 'Durban Hardware Hub',
    logo: '🔧',
    description: 'Family-owned business specializing in tools, hardware, and electrical supplies for over 15 years.',
    rating: 4.7,
    totalReviews: 156,
    location: 'Durban',
    address: '789 Marine Parade, Durban, 4000',
    phone: '+27 31 555 7890',
    email: 'hello@durbanhardware.co.za',
    categories: ['Tools & Hardware', 'Electrical', 'Plumbing & Pipes'],
    verified: true,
    businessHours: {
      monday: '8:00 AM - 5:00 PM',
      tuesday: '8:00 AM - 5:00 PM',
      wednesday: '8:00 AM - 5:00 PM',
      thursday: '8:00 AM - 5:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '8:00 AM - 3:00 PM',
      sunday: 'Closed'
    },
    policies: {
      returns: '21-day return policy on defective items',
      shipping: 'Same-day delivery available for orders before 2 PM',
      warranty: 'Extended warranty options available for power tools'
    }
  },
  {
    id: 'pretoria-pipes',
    name: 'Pretoria Pipes & Plumbing',
    logo: '🚰',
    description: 'Comprehensive plumbing supplies and solutions for residential, commercial, and industrial applications.',
    rating: 4.5,
    totalReviews: 203,
    location: 'Pretoria',
    address: '321 Plumber Street, Pretoria, 0001',
    phone: '+27 12 345 6789',
    email: 'orders@pretoriapipes.co.za',
    categories: ['Plumbing & Pipes', 'Tools & Hardware'],
    verified: true,
    businessHours: {
      monday: '7:00 AM - 4:30 PM',
      tuesday: '7:00 AM - 4:30 PM',
      wednesday: '7:00 AM - 4:30 PM',
      thursday: '7:00 AM - 4:30 PM',
      friday: '7:00 AM - 4:30 PM',
      saturday: '8:00 AM - 12:00 PM',
      sunday: 'Closed'
    },
    policies: {
      returns: '30-day return policy on unused fittings',
      shipping: 'Free delivery on bulk orders over R5,000',
      warranty: '5-year warranty on PVC pipes, 2-year on copper pipes'
    }
  },
  {
    id: 'east-london-electrical',
    name: 'East London Electrical Solutions',
    logo: '⚡',
    description: 'Leading electrical supplier in the Eastern Cape with comprehensive range of electrical components and systems.',
    rating: 4.9,
    totalReviews: 298,
    location: 'East London',
    address: '45 Buffalo Street, East London, 5201',
    phone: '+27 43 456 7890',
    email: 'sales@elelectrical.co.za',
    categories: ['Electrical', 'Tools & Hardware'],
    verified: true,
    businessHours: {
      monday: '7:30 AM - 5:00 PM',
      tuesday: '7:30 AM - 5:00 PM',
      wednesday: '7:30 AM - 5:00 PM',
      thursday: '7:30 AM - 5:00 PM',
      friday: '7:30 AM - 5:00 PM',
      saturday: '8:00 AM - 1:00 PM',
      sunday: 'Closed'
    },
    policies: {
      returns: '30-day return policy on unused electrical components',
      shipping: 'Free delivery on orders over R1,500 within 30km',
      warranty: '2-year warranty on electrical equipment'
    }
  },
  {
    id: 'bloemfontein-builders',
    name: 'Bloemfontein Builders Warehouse',
    logo: '🏗️',
    description: 'Complete building supplies and materials for all construction needs in the Free State region.',
    rating: 4.4,
    totalReviews: 167,
    location: 'Bloemfontein',
    address: '88 Industrial Road, Bloemfontein, 9300',
    phone: '+27 51 234 5678',
    email: 'info@bloembuilderswarehouse.co.za',
    categories: ['Cement & Concrete', 'Roofing Materials', 'Tools & Hardware', 'Paint & Finishes'],
    verified: true,
    businessHours: {
      monday: '7:00 AM - 5:00 PM',
      tuesday: '7:00 AM - 5:00 PM',
      wednesday: '7:00 AM - 5:00 PM',
      thursday: '7:00 AM - 5:00 PM',
      friday: '7:00 AM - 5:00 PM',
      saturday: '8:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    policies: {
      returns: '21-day return policy on unused materials',
      shipping: 'Delivery available within Free State, charges apply',
      warranty: 'Manufacturer warranty on all branded products'
    }
  },
  {
    id: 'pietermaritzburg-paint',
    name: 'PMB Paint & Coatings',
    logo: '🎨',
    description: 'Specialized paint and coating supplier serving KwaZulu-Natal with premium quality products.',
    rating: 4.6,
    totalReviews: 134,
    location: 'Pietermaritzburg',
    address: '22 Paint Street, Pietermaritzburg, 3200',
    phone: '+27 33 567 8901',
    email: 'orders@pmbpaint.co.za',
    categories: ['Paint & Finishes'],
    verified: true,
    businessHours: {
      monday: '8:00 AM - 4:30 PM',
      tuesday: '8:00 AM - 4:30 PM',
      wednesday: '8:00 AM - 4:30 PM',
      thursday: '8:00 AM - 4:30 PM',
      friday: '8:00 AM - 4:30 PM',
      saturday: '8:00 AM - 12:00 PM',
      sunday: 'Closed'
    },
    policies: {
      returns: '14-day return policy on unopened paint',
      shipping: 'Free color matching service, delivery available',
      warranty: '5-year warranty on premium exterior paints'
    }
  },
  {
    id: 'polokwane-roofing',
    name: 'Polokwane Roofing Specialists',
    logo: '🏠',
    description: 'Northern region specialists in roofing materials and solutions for residential and commercial projects.',
    rating: 4.7,
    totalReviews: 189,
    location: 'Polokwane',
    address: '15 Roof Avenue, Polokwane, 0700',
    phone: '+27 15 678 9012',
    email: 'info@polokwaneroofing.co.za',
    categories: ['Roofing Materials'],
    verified: true,
    businessHours: {
      monday: '7:00 AM - 4:30 PM',
      tuesday: '7:00 AM - 4:30 PM',
      wednesday: '7:00 AM - 4:30 PM',
      thursday: '7:00 AM - 4:30 PM',
      friday: '7:00 AM - 4:30 PM',
      saturday: '8:00 AM - 1:00 PM',
      sunday: 'Closed'
    },
    policies: {
      returns: '30-day return policy on unused roofing materials',
      shipping: 'Free delivery on orders over R3,000 within Limpopo',
      warranty: '15-year warranty on premium roofing sheets'
    }
  },
  {
    id: 'port-elizabeth-plumbing',
    name: 'Port Elizabeth Plumbing Supplies',
    logo: '🔧',
    description: 'Comprehensive plumbing and water systems supplier serving the Eastern Cape coastal region.',
    rating: 4.5,
    totalReviews: 176,
    location: 'Port Elizabeth',
    address: '67 Plumbers Way, Port Elizabeth, 6001',
    phone: '+27 41 789 0123',
    email: 'sales@peplumbing.co.za',
    categories: ['Plumbing & Pipes', 'Tools & Hardware'],
    verified: true,
    businessHours: {
      monday: '7:30 AM - 5:00 PM',
      tuesday: '7:30 AM - 5:00 PM',
      wednesday: '7:30 AM - 5:00 PM',
      thursday: '7:30 AM - 5:00 PM',
      friday: '7:30 AM - 5:00 PM',
      saturday: '8:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    policies: {
      returns: '21-day return policy on unused plumbing supplies',
      shipping: 'Same-day delivery available for urgent orders',
      warranty: '3-year warranty on quality plumbing fixtures'
    }
  },
  {
    id: 'kimberley-concrete',
    name: 'Kimberley Concrete & Aggregates',
    logo: '🏗️',
    description: 'Leading concrete and aggregate supplier in the Northern Cape with over 25 years of experience.',
    rating: 4.3,
    totalReviews: 145,
    location: 'Kimberley',
    address: '12 Concrete Road, Kimberley, 8300',
    phone: '+27 53 890 1234',
    email: 'orders@kimberleyconcrete.co.za',
    categories: ['Cement & Concrete'],
    verified: true,
    businessHours: {
      monday: '6:30 AM - 4:30 PM',
      tuesday: '6:30 AM - 4:30 PM',
      wednesday: '6:30 AM - 4:30 PM',
      thursday: '6:30 AM - 4:30 PM',
      friday: '6:30 AM - 4:30 PM',
      saturday: '7:00 AM - 12:00 PM',
      sunday: 'Closed'
    },
    policies: {
      returns: '7-day return policy on unused bagged cement',
      shipping: 'Bulk delivery service available throughout Northern Cape',
      warranty: 'Quality guarantee on all concrete products'
    }
  }
];

export const products: Product[] = [
  {
    id: 'cement-portland-42-5',
    name: 'Portland Cement 42.5N - 50kg Bag',
    description: 'High-quality Portland cement suitable for all general construction purposes. Conforms to SANS 50197-1 standards.',
    price: 89.99,
    comparePrice: 99.99,
    images: [
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df6b?w=500',
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500'
    ],
    category: 'Cement & Concrete',
    subcategory: 'Portland Cement',
    vendor: vendors[0],
    rating: 4.7,
    reviewCount: 89,
    location: 'Johannesburg',
    inStock: true,
    stockQuantity: 150,
    specifications: {
      'Type': 'CEM I 42.5N',
      'Compressive Strength': '42.5 MPa',
      'Setting Time': '45-375 minutes',
      'Weight': '50kg',
      'Standard': 'SANS 50197-1'
    },
    tags: ['cement', 'portland', 'construction', 'concrete'],
    featured: true
  },
  {
    id: 'roof-sheets-ibr-premium',
    name: 'IBR Roof Sheets - Galvanised Steel 0.4mm',
    description: 'Durable galvanised steel IBR roofing sheets. Excellent corrosion resistance and weather protection.',
    price: 245.00,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500'
    ],
    category: 'Roofing Materials',
    subcategory: 'Roof Sheets',
    vendor: vendors[1],
    rating: 4.6,
    reviewCount: 67,
    location: 'Cape Town',
    inStock: true,
    stockQuantity: 85,
    specifications: {
      'Material': 'Galvanised Steel',
      'Thickness': '0.4mm',
      'Length': '3.0m',
      'Profile': 'IBR',
      'Coating': 'Z275 Galvanised'
    },
    tags: ['roofing', 'steel', 'galvanised', 'ibr'],
    featured: true
  },
  {
    id: 'pvc-pipe-110mm',
    name: '110mm PVC Pipe Class 6 - 6m Length',
    description: 'High-quality uPVC drainage pipe suitable for sewer and stormwater applications. SABS approved.',
    price: 156.50,
    images: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500'
    ],
    category: 'Plumbing & Pipes',
    subcategory: 'PVC Pipes',
    vendor: vendors[3],
    rating: 4.8,
    reviewCount: 124,
    location: 'Pretoria',
    inStock: true,
    stockQuantity: 45,
    specifications: {
      'Diameter': '110mm',
      'Class': 'Class 6',
      'Length': '6m',
      'Material': 'uPVC',
      'Standard': 'SABS 966'
    },
    tags: ['plumbing', 'pvc', 'drainage', 'sewer'],
    featured: false
  },
  {
    id: 'angle-grinder-bosch',
    name: 'Bosch Angle Grinder GWS 750-100 - 750W',
    description: 'Professional angle grinder with 750W motor. Compact design with excellent power-to-weight ratio.',
    price: 649.99,
    comparePrice: 749.99,
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500'
    ],
    category: 'Tools & Hardware',
    subcategory: 'Power Tools',
    vendor: vendors[2],
    rating: 4.9,
    reviewCount: 78,
    location: 'Durban',
    inStock: true,
    stockQuantity: 12,
    specifications: {
      'Power': '750W',
      'Disc Size': '100mm',
      'No-Load Speed': '11,000 rpm',
      'Weight': '1.4kg',
      'Warranty': '2 years'
    },
    tags: ['tools', 'grinder', 'bosch', 'power-tool'],
    featured: true
  },
  {
    id: 'paint-exterior-white',
    name: 'Premium Exterior Paint - Pure White 20L',
    description: 'High-quality exterior acrylic paint with excellent weather resistance and UV protection.',
    price: 449.99,
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500'
    ],
    category: 'Paint & Finishes',
    subcategory: 'Exterior Paint',
    vendor: vendors[1],
    rating: 4.5,
    reviewCount: 156,
    location: 'Cape Town',
    inStock: true,
    stockQuantity: 28,
    specifications: {
      'Type': 'Acrylic',
      'Coverage': '12-14 m²/L',
      'Finish': 'Matt',
      'Volume': '20L',
      'Drying Time': '2-4 hours'
    },
    tags: ['paint', 'exterior', 'white', 'acrylic'],
    featured: false
  },
  {
    id: 'electrical-cable-2-5mm',
    name: '2.5mm² Electrical Cable - Single Core PVC 100m',
    description: 'High-quality single core PVC insulated cable suitable for domestic and commercial installations.',
    price: 789.99,
    images: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500'
    ],
    category: 'Electrical',
    subcategory: 'Cables',
    vendor: vendors[2],
    rating: 4.6,
    reviewCount: 43,
    location: 'Durban',
    inStock: true,
    stockQuantity: 67,
    specifications: {
      'Cross Section': '2.5mm²',
      'Conductor': 'Copper',
      'Insulation': 'PVC',
      'Length': '100m',
      'Voltage Rating': '300/500V'
    },
    tags: ['electrical', 'cable', 'copper', 'pvc'],
    featured: false
  },
  {
    id: 'concrete-blocks-hollow',
    name: 'Hollow Concrete Blocks 190x140x390mm',
    description: 'Standard hollow concrete masonry blocks for structural and non-structural applications.',
    price: 12.50,
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500'
    ],
    category: 'Cement & Concrete',
    subcategory: 'Concrete Blocks',
    vendor: vendors[0],
    rating: 4.4,
    reviewCount: 92,
    location: 'Johannesburg',
    inStock: true,
    stockQuantity: 500,
    specifications: {
      'Dimensions': '190x140x390mm',
      'Type': 'Hollow',
      'Strength': '4 MPa',
      'Weight': '11kg',
      'Standard': 'SANS 1215'
    },
    tags: ['concrete', 'blocks', 'masonry', 'hollow'],
    featured: false
  },
  {
    id: 'cement-surebuild-32-5',
    name: 'Surebuild Cement 32.5R - 50kg Bag',
    description: 'Rapid hardening cement ideal for urgent construction projects. Early strength development.',
    price: 82.50,
    images: [
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df6b?w=500'
    ],
    category: 'Cement & Concrete',
    subcategory: 'Portland Cement',
    vendor: vendors[1],
    rating: 4.5,
    reviewCount: 112,
    location: 'Cape Town',
    inStock: true,
    stockQuantity: 200,
    specifications: {
      'Type': 'CEM II 32.5R',
      'Compressive Strength': '32.5 MPa',
      'Setting Time': '60 minutes initial',
      'Weight': '50kg',
      'Standard': 'SANS 50197-1'
    },
    tags: ['cement', 'surebuild', 'rapid', 'hardening'],
    featured: false
  },
  {
    id: 'ready-mix-concrete',
    name: 'Ready Mix Concrete 25 MPa - Per m³',
    description: 'High-quality ready mixed concrete delivered to site. 25 MPa compressive strength suitable for foundations and structural work.',
    price: 1250.00,
    images: [
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500'
    ],
    category: 'Cement & Concrete',
    subcategory: 'Ready Mix Concrete',
    vendor: vendors[0],
    rating: 4.8,
    reviewCount: 67,
    location: 'Johannesburg',
    inStock: true,
    stockQuantity: 50,
    specifications: {
      'Compressive Strength': '25 MPa',
      'Slump': '75-125mm',
      'Maximum Aggregate Size': '19mm',
      'Cement Content': '300kg/m³',
      'Water Cement Ratio': '0.55'
    },
    tags: ['concrete', 'ready-mix', 'structural', 'foundation'],
    featured: true
  },
  {
    id: 'concrete-blocks-solid',
    name: 'Solid Concrete Blocks 190x90x390mm',
    description: 'Dense solid concrete blocks ideal for load-bearing walls and retaining structures.',
    price: 15.75,
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500'
    ],
    category: 'Cement & Concrete',
    subcategory: 'Concrete Blocks',
    vendor: vendors[0],
    rating: 4.6,
    reviewCount: 78,
    location: 'Johannesburg',
    inStock: true,
    stockQuantity: 300,
    specifications: {
      'Dimensions': '190x90x390mm',
      'Type': 'Solid',
      'Strength': '8 MPa',
      'Weight': '15kg',
      'Standard': 'SANS 1215'
    },
    tags: ['concrete', 'blocks', 'solid', 'load-bearing'],
    featured: false
  },
  {
    id: 'rebar-y12',
    name: 'Reinforcing Steel Bar Y12 - 6m Length',
    description: 'High tensile reinforcing steel bars for concrete reinforcement. Grade 500 MPa yield strength.',
    price: 89.50,
    images: [
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500'
    ],
    category: 'Cement & Concrete',
    subcategory: 'Reinforcement',
    vendor: vendors[4],
    rating: 4.8,
    reviewCount: 156,
    location: 'East London',
    inStock: true,
    stockQuantity: 200,
    specifications: {
      'Diameter': '12mm',
      'Length': '6m',
      'Grade': '500 MPa',
      'Type': 'Ribbed',
      'Standard': 'SANS 920'
    },
    tags: ['rebar', 'reinforcement', 'steel', 'concrete'],
    featured: false
  },

  // Roofing Materials
  {
    id: 'roof-sheets-chromadek',
    name: 'Chromadek Roof Sheets - Color Coated 0.5mm',
    description: 'Premium color-coated steel roofing with superior corrosion resistance. 15-year warranty.',
    price: 395.00,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    category: 'Roofing Materials',
    subcategory: 'Roof Sheets',
    vendor: vendors[1],
    rating: 4.9,
    reviewCount: 89,
    location: 'Cape Town',
    inStock: true,
    stockQuantity: 45,
    specifications: {
      'Material': 'Color Coated Steel',
      'Thickness': '0.5mm',
      'Length': '3.0m',
      'Profile': 'IBR',
      'Warranty': '15 years'
    },
    tags: ['roofing', 'chromadek', 'color-coated', 'premium'],
    featured: true
  },
  {
    id: 'gutters-pvc',
    name: 'PVC Gutters 110mm - 3m Length',
    description: 'Durable PVC guttering system with UV stabilizers. Easy installation with snap-fit joints.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500'
    ],
    category: 'Roofing Materials',
    subcategory: 'Gutters',
    vendor: vendors[1],
    rating: 4.3,
    reviewCount: 76,
    location: 'Cape Town',
    inStock: true,
    stockQuantity: 120,
    specifications: {
      'Material': 'PVC',
      'Size': '110mm',
      'Length': '3m',
      'Color': 'White',
      'UV Protection': 'Yes'
    },
    tags: ['gutters', 'pvc', 'drainage', 'white'],
    featured: false
  },
  {
    id: 'roof-insulation',
    name: 'Roof Insulation Bulk - R1.8 100mm Thick',
    description: 'Glasswool bulk insulation for ceiling applications. Excellent thermal performance.',
    price: 45.50,
    images: [
      'https://images.unsplash.com/photo-1581847017062-068ac3d43c9a?w=500'
    ],
    category: 'Roofing Materials',
    subcategory: 'Insulation',
    vendor: vendors[1],
    rating: 4.5,
    reviewCount: 98,
    location: 'Cape Town',
    inStock: true,
    stockQuantity: 200,
    specifications: {
      'Type': 'Glasswool Bulk',
      'Thickness': '100mm',
      'R-Value': '1.8',
      'Width': '430mm',
      'Length': '1200mm'
    },
    tags: ['insulation', 'glasswool', 'thermal', 'ceiling'],
    featured: false
  },

  // Plumbing & Pipes
  {
    id: 'copper-pipe-15mm',
    name: '15mm Copper Pipe Type L - 3m Length',
    description: 'High-grade copper pipe for hot and cold water applications. Corrosion resistant.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500'
    ],
    category: 'Plumbing & Pipes',
    subcategory: 'Copper Pipes',
    vendor: vendors[3],
    rating: 4.7,
    reviewCount: 87,
    location: 'Pretoria',
    inStock: true,
    stockQuantity: 78,
    specifications: {
      'Diameter': '15mm',
      'Type': 'Type L',
      'Length': '3m',
      'Material': 'Copper',
      'Wall Thickness': '0.8mm'
    },
    tags: ['plumbing', 'copper', 'water', 'pipe'],
    featured: false
  },
  {
    id: 'toilet-suite-vitreous',
    name: 'Vitreous China Toilet Suite - Close Coupled',
    description: 'Complete toilet suite with cistern, pan, and fittings. Water-efficient dual flush system.',
    price: 1299.99,
    comparePrice: 1499.99,
    images: [
      'https://images.unsplash.com/photo-1584622781436-0fbdfe838a9c?w=500'
    ],
    category: 'Plumbing & Pipes',
    subcategory: 'Fixtures',
    vendor: vendors[3],
    rating: 4.6,
    reviewCount: 134,
    location: 'Pretoria',
    inStock: true,
    stockQuantity: 15,
    specifications: {
      'Material': 'Vitreous China',
      'Type': 'Close Coupled',
      'Flush': 'Dual Flush 3/6L',
      'Height': '770mm',
      'Rough-in': '300mm'
    },
    tags: ['toilet', 'bathroom', 'vitreous', 'dual-flush'],
    featured: true
  },

  // Additional Tools & Hardware
  {
    id: 'drill-dewalt-18v',
    name: 'DeWalt 18V Cordless Drill/Driver Kit',
    description: 'Professional cordless drill with brushless motor, 2 batteries, charger and carry case.',
    price: 2899.99,
    comparePrice: 3299.99,
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500'
    ],
    category: 'Tools & Hardware',
    subcategory: 'Power Tools',
    vendor: vendors[2],
    rating: 4.8,
    reviewCount: 234,
    location: 'Durban',
    inStock: true,
    stockQuantity: 18,
    specifications: {
      'Voltage': '18V',
      'Chuck Size': '13mm',
      'Torque': '65 Nm',
      'Battery': '2x 2.0Ah Li-ion',
      'Warranty': '3 years'
    },
    tags: ['drill', 'dewalt', 'cordless', 'professional'],
    featured: true
  },
  {
    id: 'hammer-claw-steel',
    name: 'Steel Claw Hammer 450g',
    description: 'High-quality steel claw hammer with ergonomic handle. Perfect for general construction work.',
    price: 189.99,
    images: [
      'https://images.unsplash.com/photo-1581049882382-9d345be7a8b5?w=500'
    ],
    category: 'Tools & Hardware',
    subcategory: 'Hand Tools',
    vendor: vendors[2],
    rating: 4.6,
    reviewCount: 156,
    location: 'Durban',
    inStock: true,
    stockQuantity: 89,
    specifications: {
      'Weight': '450g',
      'Head': 'Hardened Steel',
      'Handle': 'Fiberglass',
      'Length': '330mm',
      'Grip': 'Non-slip'
    },
    tags: ['hammer', 'claw', 'steel', 'hand-tool'],
    featured: false
  },
  {
    id: 'screwdriver-set-professional',
    name: 'Professional Screwdriver Set - 12 Piece',
    description: 'Complete screwdriver set with Phillips and flathead drivers. Magnetic tips and comfort grips.',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500'
    ],
    category: 'Tools & Hardware',
    subcategory: 'Hand Tools',
    vendor: vendors[2],
    rating: 4.5,
    reviewCount: 98,
    location: 'Durban',
    inStock: true,
    stockQuantity: 67,
    specifications: {
      'Pieces': '12',
      'Type': 'Phillips & Flathead',
      'Tips': 'Magnetic',
      'Handle': 'Comfort Grip',
      'Storage': 'Wall Mount Rack'
    },
    tags: ['screwdriver', 'set', 'professional', 'magnetic'],
    featured: false
  },
  {
    id: 'safety-helmet-hard-hat',
    name: 'Safety Hard Hat - SABS Approved',
    description: 'High-impact safety helmet for construction sites. Adjustable suspension system.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1581050706328-9fa0fea49eb0?w=500'
    ],
    category: 'Tools & Hardware',
    subcategory: 'Safety Equipment',
    vendor: vendors[2],
    rating: 4.7,
    reviewCount: 203,
    location: 'Durban',
    inStock: true,
    stockQuantity: 145,
    specifications: {
      'Standard': 'SABS 1397',
      'Material': 'High-density Polyethylene',
      'Suspension': 'Adjustable 6-point',
      'Color': 'White',
      'Weight': '350g'
    },
    tags: ['safety', 'helmet', 'hard-hat', 'construction'],
    featured: false
  },
  {
    id: 'bolts-hex-m12',
    name: 'Hex Bolts M12x80mm - Galvanized (Box of 50)',
    description: 'High-strength galvanized hex bolts for structural applications. Grade 8.8.',
    price: 245.00,
    images: [
      'https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=500'
    ],
    category: 'Tools & Hardware',
    subcategory: 'Fasteners',
    vendor: vendors[2],
    rating: 4.4,
    reviewCount: 67,
    location: 'Durban',
    inStock: true,
    stockQuantity: 200,
    specifications: {
      'Size': 'M12x80mm',
      'Grade': '8.8',
      'Coating': 'Galvanized',
      'Head Type': 'Hex',
      'Quantity': '50 pieces'
    },
    tags: ['bolts', 'hex', 'galvanized', 'structural'],
    featured: false
  },

  // Additional Electrical Products
  {
    id: 'distribution-board-12-way',
    name: '12-Way Distribution Board - Metal Enclosure',
    description: 'Complete 12-way distribution board with main switch and MCBs. Ready for installation.',
    price: 1299.99,
    images: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500'
    ],
    category: 'Electrical',
    subcategory: 'Distribution Boards',
    vendor: vendors[4],
    rating: 4.6,
    reviewCount: 89,
    location: 'East London',
    inStock: true,
    stockQuantity: 34,
    specifications: {
      'Ways': '12',
      'Main Switch': '63A',
      'Enclosure': 'Metal IP65',
      'MCBs Included': '12 x 20A',
      'Standard': 'SANS 1157'
    },
    tags: ['distribution', 'board', 'electrical', 'mcb'],
    featured: true
  },
  {
    id: 'led-lights-downlight-kit',
    name: 'LED Downlight Kit - 6 Pack 9W Cool White',
    description: 'Energy-efficient LED downlights with drivers and cutting templates. 5-year warranty.',
    price: 899.99,
    comparePrice: 1199.99,
    images: [
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500'
    ],
    category: 'Electrical',
    subcategory: 'Lighting',
    vendor: vendors[4],
    rating: 4.8,
    reviewCount: 156,
    location: 'East London',
    inStock: true,
    stockQuantity: 78,
    specifications: {
      'Power': '9W',
      'Color Temperature': '6000K Cool White',
      'Lumens': '900lm',
      'Cut-out': '90mm',
      'Warranty': '5 years'
    },
    tags: ['led', 'downlight', 'cool-white', 'energy-efficient'],
    featured: true
  },
  {
    id: 'switches-toggle-2-lever',
    name: '2-Lever Light Switch - White',
    description: 'Premium quality 2-lever light switch with white finish. SABS approved.',
    price: 45.99,
    images: [
      'https://images.unsplash.com/photo-1558346648-986b5d67835c?w=500'
    ],
    category: 'Electrical',
    subcategory: 'Switches',
    vendor: vendors[4],
    rating: 4.3,
    reviewCount: 234,
    location: 'East London',
    inStock: true,
    stockQuantity: 456,
    specifications: {
      'Type': '2-Lever',
      'Rating': '16A 250V',
      'Color': 'White',
      'Standard': 'SABS 164-1',
      'Mounting': 'Horizontal'
    },
    tags: ['switch', 'light', 'white', '2-lever'],
    featured: false
  },

  // Additional Paint & Finishes
  {
    id: 'paint-interior-magnolia',
    name: 'Premium Interior Paint - Magnolia 20L',
    description: 'High-quality interior emulsion paint with excellent coverage and washability.',
    price: 389.99,
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500'
    ],
    category: 'Paint & Finishes',
    subcategory: 'Interior Paint',
    vendor: vendors[6],
    rating: 4.6,
    reviewCount: 178,
    location: 'Pietermaritzburg',
    inStock: true,
    stockQuantity: 67,
    specifications: {
      'Type': 'Emulsion',
      'Coverage': '14-16 m²/L',
      'Finish': 'Silk',
      'Volume': '20L',
      'Washability': 'Excellent'
    },
    tags: ['paint', 'interior', 'magnolia', 'emulsion'],
    featured: false
  },
  {
    id: 'wood-stain-teak',
    name: 'Teak Wood Stain 5L - Water Based',
    description: 'Eco-friendly water-based wood stain for interior and exterior timber applications.',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500'
    ],
    category: 'Paint & Finishes',
    subcategory: 'Wood Stains',
    vendor: vendors[6],
    rating: 4.5,
    reviewCount: 89,
    location: 'Pietermaritzburg',
    inStock: true,
    stockQuantity: 45,
    specifications: {
      'Type': 'Water-based',
      'Color': 'Teak',
      'Coverage': '12-15 m²/L',
      'Volume': '5L',
      'Drying Time': '2 hours'
    },
    tags: ['wood', 'stain', 'teak', 'water-based'],
    featured: false
  },
  {
    id: 'primer-universal-white',
    name: 'Universal Primer - White 20L',
    description: 'High-quality undercoat primer suitable for wood, metal and previously painted surfaces.',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500'
    ],
    category: 'Paint & Finishes',
    subcategory: 'Primers',
    vendor: vendors[6],
    rating: 4.4,
    reviewCount: 145,
    location: 'Pietermaritzburg',
    inStock: true,
    stockQuantity: 89,
    specifications: {
      'Type': 'Universal',
      'Coverage': '10-12 m²/L',
      'Color': 'White',
      'Volume': '20L',
      'Surfaces': 'Wood, Metal, Painted'
    },
    tags: ['primer', 'universal', 'white', 'undercoat'],
    featured: false
  },

  // Additional Roofing Materials
  {
    id: 'roof-sheets-corrugated',
    name: 'Corrugated Iron Sheets - Galvanised 0.5mm',
    description: 'Traditional corrugated iron roofing sheets with excellent weather resistance.',
    price: 189.99,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    category: 'Roofing Materials',
    subcategory: 'Roof Sheets',
    vendor: vendors[7],
    rating: 4.5,
    reviewCount: 156,
    location: 'Polokwane',
    inStock: true,
    stockQuantity: 234,
    specifications: {
      'Material': 'Galvanised Steel',
      'Thickness': '0.5mm',
      'Length': '3.0m',
      'Profile': 'Corrugated',
      'Coverage': '762mm'
    },
    tags: ['roofing', 'corrugated', 'galvanised', 'traditional'],
    featured: false
  },
  {
    id: 'roof-tiles-concrete',
    name: 'Concrete Roof Tiles - Charcoal Grey',
    description: 'Modern concrete roof tiles with interlocking design. Weather resistant and durable.',
    price: 12.50,
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500'
    ],
    category: 'Roofing Materials',
    subcategory: 'Tiles',
    vendor: vendors[7],
    rating: 4.6,
    reviewCount: 98,
    location: 'Polokwane',
    inStock: true,
    stockQuantity: 1500,
    specifications: {
      'Material': 'Concrete',
      'Color': 'Charcoal Grey',
      'Weight': '4.2kg',
      'Coverage': '9.8 tiles/m²',
      'Profile': 'Interlocking'
    },
    tags: ['roofing', 'tiles', 'concrete', 'charcoal'],
    featured: false
  },

  // Additional Plumbing & Pipes
  {
    id: 'basin-ceramic-wall-mounted',
    name: 'Wall Mounted Ceramic Basin - White',
    description: 'Modern wall-mounted ceramic basin with overflow. Complete with wall brackets.',
    price: 899.99,
    images: [
      'https://images.unsplash.com/photo-1584622781436-0fbdfe838a9c?w=500'
    ],
    category: 'Plumbing & Pipes',
    subcategory: 'Fixtures',
    vendor: vendors[8],
    rating: 4.5,
    reviewCount: 67,
    location: 'Port Elizabeth',
    inStock: true,
    stockQuantity: 23,
    specifications: {
      'Material': 'Ceramic',
      'Color': 'White',
      'Mounting': 'Wall Mounted',
      'Overflow': 'Yes',
      'Dimensions': '550x400mm'
    },
    tags: ['basin', 'ceramic', 'wall-mounted', 'bathroom'],
    featured: false
  },
  {
    id: 'pvc-fittings-90-elbow',
    name: 'PVC 90° Elbow Fittings 110mm - Pack of 10',
    description: 'Heavy-duty PVC elbow fittings for drainage applications. SABS approved.',
    price: 189.99,
    images: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500'
    ],
    category: 'Plumbing & Pipes',
    subcategory: 'Fittings',
    vendor: vendors[8],
    rating: 4.7,
    reviewCount: 123,
    location: 'Port Elizabeth',
    inStock: true,
    stockQuantity: 156,
    specifications: {
      'Size': '110mm',
      'Angle': '90°',
      'Material': 'uPVC',
      'Quantity': '10 pieces',
      'Standard': 'SABS 966'
    },
    tags: ['pvc', 'fittings', 'elbow', 'drainage'],
    featured: false
  },

  // Additional Cement & Concrete
  {
    id: 'cement-masonry-42-5',
    name: 'Masonry Cement 42.5N - 40kg Bag',
    description: 'Specialized masonry cement for brickwork and blockwork. Enhanced workability.',
    price: 78.50,
    images: [
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df6b?w=500'
    ],
    category: 'Cement & Concrete',
    subcategory: 'Portland Cement',
    vendor: vendors[9],
    rating: 4.6,
    reviewCount: 234,
    location: 'Kimberley',
    inStock: true,
    stockQuantity: 345,
    specifications: {
      'Type': 'Masonry Cement',
      'Compressive Strength': '42.5 MPa',
      'Weight': '40kg',
      'Application': 'Brickwork & Blockwork',
      'Workability': 'Enhanced'
    },
    tags: ['cement', 'masonry', 'brickwork', 'mortar'],
    featured: false
  },
  {
    id: 'concrete-mix-25mpa',
    name: 'Concrete Mix 25 MPa - 40kg Bag',
    description: 'Ready-to-mix concrete for small projects. Just add water and mix.',
    price: 67.50,
    images: [
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500'
    ],
    category: 'Cement & Concrete',
    subcategory: 'Ready Mix Concrete',
    vendor: vendors[9],
    rating: 4.5,
    reviewCount: 178,
    location: 'Kimberley',
    inStock: true,
    stockQuantity: 289,
    specifications: {
      'Strength': '25 MPa',
      'Weight': '40kg',
      'Coverage': '0.018 m³',
      'Type': 'Dry Mix',
      'Application': 'Small Projects'
    },
    tags: ['concrete', 'mix', 'ready-mix', 'diy'],
    featured: false
  },
  {
    id: 'additives-waterproof',
    name: 'Concrete Waterproofing Additive - 5kg',
    description: 'High-performance waterproofing additive for concrete and mortar applications.',
    price: 189.99,
    images: [
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500'
    ],
    category: 'Cement & Concrete',
    subcategory: 'Additives',
    vendor: vendors[9],
    rating: 4.8,
    reviewCount: 89,
    location: 'Kimberley',
    inStock: true,
    stockQuantity: 67,
    specifications: {
      'Type': 'Waterproofing Additive',
      'Coverage': '50kg cement',
      'Weight': '5kg',
      'Application': 'Concrete & Mortar',
      'Performance': 'High'
    },
    tags: ['additive', 'waterproof', 'concrete', 'mortar'],
    featured: false
  }
];

export const locations = [
  'Johannesburg',
  'Cape Town', 
  'Durban',
  'Pretoria',
  'Port Elizabeth',
  'Bloemfontein',
  'East London',
  'Pietermaritzburg',
  'Kimberley',
  'Polokwane'
];

// Filter functions
export const filterProducts = (
  products: Product[],
  filters: {
    category?: string;
    subcategory?: string;
    vendor?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    search?: string;
  }
): Product[] => {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.subcategory && product.subcategory !== filters.subcategory) return false;
    if (filters.vendor && product.vendor.id !== filters.vendor) return false;
    if (filters.location && product.location !== filters.location) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.inStock && !product.inStock) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const searchableText = `${product.name} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
      if (!searchableText.includes(searchLower)) return false;
    }
    return true;
  });
};

export const sortProducts = (
  products: Product[],
  sortBy: 'price-low' | 'price-high' | 'rating' | 'name' | 'newest'
): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
    default:
      return sorted; // For now, return as-is since we don't have dates
  }
};