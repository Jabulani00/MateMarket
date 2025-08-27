import { Shield, Truck, Users } from 'lucide-react';

export function TrustSection() {
  return (
    <section className="py-16 bg-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose MatMarket?
          </h2>
          <p className="text-xl text-orange-100">
            Your trusted partner for building materials and construction supplies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-orange-200" />
            <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-orange-100">
              All products verified for quality and authenticity. 30-day return policy on all orders.
            </p>
          </div>
          
          <div className="text-center">
            <Truck className="h-16 w-16 mx-auto mb-4 text-orange-200" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-orange-100">
              Nationwide delivery network. Same-day delivery available in major cities.
            </p>
          </div>
          
          <div className="text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-orange-200" />
            <h3 className="text-xl font-semibold mb-2">Verified Vendors</h3>
            <p className="text-orange-100">
              All suppliers thoroughly vetted and verified for your peace of mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}