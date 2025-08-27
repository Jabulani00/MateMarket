import { Users, Package, Shield, Truck } from 'lucide-react';

export function StatsSection() {
  const stats = [
    { icon: Users, label: 'Verified Vendors', value: '2,500+' },
    { icon: Package, label: 'Products Listed', value: '85,000+' },
    { icon: Shield, label: 'Quality Guaranteed', value: '100%' },
    { icon: Truck, label: 'Nationwide Delivery', value: '9 Provinces' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <stat.icon className="h-12 w-12 text-orange-500" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}