import { Phone, Mail, MessageCircle } from 'lucide-react';

export const contactMethods = [
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our support team',
    contact: '+27 11 123 4567',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us an email and we\'ll respond within 24 hours',
    contact: 'support@matmarket.co.za',
    hours: '24/7 Response',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our team in real-time',
    contact: 'Available on website',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
  },
];

export const offices = [
  {
    city: 'Johannesburg',
    address: '123 Industrial Avenue, Johannesburg, 2000',
    phone: '+27 11 123 4567',
    email: 'jhb@matmarket.co.za',
  },
  {
    city: 'Cape Town',
    address: '456 Business District, Cape Town, 8000',
    phone: '+27 21 987 6543',
    email: 'cpt@matmarket.co.za',
  },
  {
    city: 'Durban',
    address: '789 Commercial Road, Durban, 4000',
    phone: '+27 31 555 7890',
    email: 'dbn@matmarket.co.za',
  },
];

export const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'vendor', label: 'Vendor Partnership' },
  { value: 'support', label: 'Technical Support' },
  { value: 'billing', label: 'Billing & Orders' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'other', label: 'Other' },
];

export const provinces = [
  'Western Cape',
  'Eastern Cape',
  'Northern Cape',
  'Free State',
  'KwaZulu-Natal',
  'North West',
  'Gauteng',
  'Mpumalanga',
  'Limpopo'
];