import { HelpCircle, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ContactMethodCard } from './ContactPage/ContactMethodCard';
import { ContactForm } from './ContactPage/ContactForm';
import { OfficeCard } from './ContactPage/OfficeCard';
import { contactMethods, offices } from './ContactPage/constants';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our products or services? We're here to help! 
            Get in touch with our friendly support team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method) => (
            <ContactMethodCard key={method.title} method={method} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* FAQ and Office Info */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-orange-500" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      How do I track my order?
                    </h4>
                    <p className="text-sm text-gray-600">
                      You can track your order by logging into your account and visiting 
                      the "Order History" section in your dashboard.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      What is your return policy?
                    </h4>
                    <p className="text-sm text-gray-600">
                      We offer a 30-day return policy on most items. Items must be 
                      unused and in original packaging. Some restrictions apply.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Do you offer bulk pricing?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Yes! We offer competitive bulk pricing for large orders. 
                      Contact us directly for a custom quote.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-orange-500" />
                  <span>Visit Our Offices</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Drop by one of our offices to speak with our team in person or 
                  to view product samples.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office) => (
              <OfficeCard key={office.city} office={office} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}