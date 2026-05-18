export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  leadSuppliers: string[];
  leadCollectors: string[];
  visibleDataFields: string[];
  sampleLeadPrice: number;
  color: string;
}

export const categories: Category[] = [
  {
    id: 'study-abroad',
    name: 'Study Abroad',
    icon: '🎓',
    description: 'International education and student placement',
    leadSuppliers: ['Small Language Centers', 'Local Sub-Agents', 'Campus Ambassadors'],
    leadCollectors: ['Study Abroad Agencies', 'University Representatives'],
    visibleDataFields: ['IELTS Score', 'HSC/Academic Score', 'Destination Country', 'Budget'],
    sampleLeadPrice: 1000,
    color: 'orange',
  },
  {
    id: 'travel-tourism',
    name: 'Travel & Tourism',
    icon: '✈️',
    description: 'Travel packages, tours, and tourism services',
    leadSuppliers: ['Visa Processing Booths', 'Local Guides', 'Corporate HR Teams'],
    leadCollectors: ['Travel Agencies', 'Tour Operators'],
    visibleDataFields: ['Route', 'Number of Travelers', 'Budget', 'Travel Date'],
    sampleLeadPrice: 800,
    color: 'green',
  },
  {
    id: 'hotel-hospitality',
    name: 'Hotel & Hospitality',
    icon: '🏨',
    description: 'Hotels, resorts, and hospitality services',
    leadSuppliers: ['Influencers', 'Event Planners', 'Travel Bloggers'],
    leadCollectors: ['Hotels', 'Resorts', 'Homestay Owners'],
    visibleDataFields: ['Guest Count', 'Location', 'Event Type', 'Check-in Date'],
    sampleLeadPrice: 600,
    color: 'orange',
  },
  {
    id: 'aviation',
    name: 'Aviation & Ticketing',
    icon: '🛫',
    description: 'Flight tickets and airline services',
    leadSuppliers: ['Small Travel Agents', 'Freelance Ticket Brokers'],
    leadCollectors: ['IATA Agents', 'Airline Wholesalers'],
    visibleDataFields: ['Route', 'Travel Date', 'Ticket Type', 'Class'],
    sampleLeadPrice: 500,
    color: 'green',
  },
  {
    id: 'fashion-clothing',
    name: 'Fashion & Clothing',
    icon: '👗',
    description: 'Wholesale fashion and garment orders',
    leadSuppliers: ['Boutique Shops', 'Online Resellers', 'Garment Brokers'],
    leadCollectors: ['Wholesalers', 'Manufacturers', 'Fabric Suppliers'],
    visibleDataFields: ['Quantity', 'Product Type', 'Fabric Specs', 'Budget per Piece'],
    sampleLeadPrice: 300,
    color: 'orange',
  },
  {
    id: 'electronics',
    name: 'Electronics & Gadgets',
    icon: '💻',
    description: 'Electronic devices and gadgets wholesale',
    leadSuppliers: ['Dropshippers', 'Tech Mechanics', 'Corporate Purchase Teams'],
    leadCollectors: ['Importers', 'Showroom Owners', 'Distributors'],
    visibleDataFields: ['Quantity', 'Product Specs', 'Purpose', 'Budget'],
    sampleLeadPrice: 400,
    color: 'green',
  },
];

export type UserRole = 'supplier' | 'collector' | 'admin';

export interface Lead {
  id: string;
  categoryId: string;
  status: 'pending' | 'verified' | 'sold' | 'expired';
  verificationStatus: 'unverified' | 'otp-sent' | 'verified-gold';
  submittedBy: string;
  submittedAt: Date;
  data: Record<string, any>;
  bidCount: number;
  highestBid?: number;
  unlockPrice: number;
  isPremiumExclusive: boolean;
  exclusiveUntil?: Date;
}

export interface Bid {
  id: string;
  leadId: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: Date;
  status: 'active' | 'won' | 'lost';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  categoryId: string;
  isPremium: boolean;
  walletBalance: number;
  totalEarnings: number;
  leadsSubmitted?: number;
  leadsUnlocked?: number;
}

export interface Transaction {
  id: string;
  type: 'commission' | 'unlock-fee' | 'subscription' | 'escrow';
  amount: number;
  description: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}
