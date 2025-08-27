import { MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
}

interface OfficeCardProps {
  office: Office;
}

export function OfficeCard({ office }: OfficeCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-orange-500" />
          <span>{office.city}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="font-medium text-gray-900 mb-1">Address</div>
            <p className="text-sm text-gray-600">{office.address}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <a href={`tel:${office.phone}`} className="text-orange-600 hover:text-orange-700">
                {office.phone}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-gray-400" />
              <a href={`mailto:${office.email}`} className="text-orange-600 hover:text-orange-700">
                {office.email}
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}