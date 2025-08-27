import { Card, CardContent } from '../ui/card';

interface ContactMethod {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  contact: string;
  hours: string;
}

interface ContactMethodCardProps {
  method: ContactMethod;
}

export function ContactMethodCard({ method }: ContactMethodCardProps) {
  const IconComponent = method.icon;
  
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <IconComponent className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{method.description}</p>
        <div className="space-y-1">
          <div className="font-medium text-orange-600">{method.contact}</div>
          <div className="text-xs text-gray-500">{method.hours}</div>
        </div>
      </CardContent>
    </Card>
  );
}