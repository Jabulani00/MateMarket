import { Shield, Users, Award, Truck, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const stats = [
  { label: 'Active Vendors', value: '500+', icon: Users },
  { label: 'Products Available', value: '10,000+', icon: Award },
  { label: 'Orders Delivered', value: '50,000+', icon: Truck },
  { label: 'Cities Covered', value: '25+', icon: MapPin },
];

const values = [
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'All vendors are verified and vetted to ensure quality and reliability for every transaction.',
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'We maintain strict quality standards and partner only with reputable suppliers.',
  },
  {
    icon: Clock,
    title: 'Reliable Service',
    description: 'Fast delivery, responsive customer service, and hassle-free returns for peace of mind.',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'We deliver to all major cities across South Africa with competitive shipping rates.',
  },
];

const team = [
  {
    name: 'Jabulani Gwala',
    role: 'CEO & Founder',
    image: 'https://jabulanigwala.bio/assests/_DSC0052.JPG',
    description: 'Full Stack Developer. What started as late-night curiosity about web development has evolved into a passion for creating digital solutions that make a real difference.',
    location: 'Durban, South Africa',
    stats: {
      projects: '15+',
      experience: '3+',
      successRate: '100%'
    }
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About MatMarket
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              South Africa's premier marketplace connecting builders, contractors, and homeowners 
              with trusted suppliers of quality building materials.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  MatMarket was founded in 2020 with a simple mission: to make it easier for 
                  construction professionals and homeowners to find and purchase quality building 
                  materials from trusted local suppliers.
                </p>
                <p>
                  We recognized that the construction industry in South Africa was fragmented, 
                  with buyers struggling to find reliable suppliers and compare prices across 
                  different vendors. Our platform bridges this gap by bringing together vetted 
                  suppliers under one digital roof.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers across South Africa, 
                  from individual DIY enthusiasts to large construction companies, helping 
                  them build their dreams with confidence.
                </p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1541976590-713941681591?w=600"
                alt="Construction site"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <Card key={value.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Founder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The visionary behind MatMarket, working to transform the building materials industry
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">{member.role}</Badge>
                  <p className="text-gray-700 mb-4 text-lg max-w-2xl mx-auto">{member.description}</p>
                  <p className="text-gray-600 mb-6 flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Based in {member.location}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-1">{member.stats.projects}</div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-1">{member.stats.experience}</div>
                      <div className="text-sm text-gray-600">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-1">{member.stats.successRate}</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-gray-600 italic">
                      "I don't just write code — I architect experiences. From concept to deployment, I partner with clients to understand their vision and transform it into powerful, scalable solutions that drive business growth."
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href="https://www.jabulanigwala.bio" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      Visit Portfolio →
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 mb-8">
            To empower builders, contractors, and homeowners across South Africa by providing 
            easy access to quality building materials from trusted local suppliers, backed by 
            exceptional service and competitive pricing.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">2020</div>
              <div className="text-gray-600">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">9 Provinces</div>
              <div className="text-gray-600">Coverage Area</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}