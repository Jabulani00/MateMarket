import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export function CTASection() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of contractors, builders, and DIY enthusiasts who trust MatMarket for their building material needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Start Shopping
            </Button>
          </Link>
          <Link to="/vendors/register">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              Become a Vendor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}