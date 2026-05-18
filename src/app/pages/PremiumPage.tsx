import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft,
  Star,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  CheckCircle,
  Crown,
} from 'lucide-react';

export default function PremiumPage() {
  const navigate = useNavigate();
  const { user, updateWallet } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  if (!user) {
    navigate('/login');
    return null;
  }

  const plans = {
    monthly: {
      price: 15000,
      period: 'month',
      savings: 0,
    },
    yearly: {
      price: 150000,
      period: 'year',
      savings: 30000,
    },
  };

  const handleSubscribe = () => {
    const plan = plans[selectedPlan];
    if (user.walletBalance >= plan.price) {
      updateWallet(-plan.price);
      alert(`Successfully subscribed to VIP Premium (${selectedPlan})!`);
      navigate('/dashboard');
    } else {
      alert('Insufficient wallet balance. Please add funds.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            startIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            VIP Premium Membership
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Get exclusive early access to high-value leads and dominate your market
          </p>
        </div>

        {/* Plan Selection */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={selectedPlan === 'monthly' ? 'contained' : 'outlined'}
            size="large"
            onClick={() => setSelectedPlan('monthly')}
            sx={selectedPlan === 'monthly' ? {
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            } : {}}
          >
            Monthly
          </Button>
          <Button
            variant={selectedPlan === 'yearly' ? 'contained' : 'outlined'}
            size="large"
            onClick={() => setSelectedPlan('yearly')}
            sx={selectedPlan === 'yearly' ? {
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            } : {}}
          >
            Yearly
            <Chip
              label="Save ৳30K"
              size="small"
              sx={{ ml: 1, background: '#22c55e', color: 'white', fontWeight: 'bold' }}
            />
          </Button>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 border-4 border-amber-400 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-amber-900 mb-2">
                ৳{plans[selectedPlan].price.toLocaleString()}
              </div>
              <div className="text-amber-700 text-lg">per {plans[selectedPlan].period}</div>
              {selectedPlan === 'yearly' && (
                <div className="mt-2 text-green-600 font-semibold">
                  Save ৳{plans.yearly.savings.toLocaleString()} per year
                </div>
              )}
            </div>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubscribe}
              startIcon={<Star className="w-5 h-5" />}
              sx={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
              }}
            >
              Upgrade to VIP Now
            </Button>

            <div className="text-center text-sm text-amber-800 mt-4">
              Your Balance: ৳{user.walletBalance.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">1-Hour Early Access</h3>
                <p className="text-gray-600 text-sm">
                  Get exclusive access to new high-value leads 1 hour before regular members.
                  No competition, higher conversion rates.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Priority Notifications</h3>
                <p className="text-gray-600 text-sm">
                  Instant notifications for premium leads matching your criteria.
                  Never miss a golden opportunity.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Advanced Analytics</h3>
                <p className="text-gray-600 text-sm">
                  Detailed insights on lead quality, conversion rates, and ROI tracking.
                  Make data-driven decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Money-Back Guarantee</h3>
                <p className="text-gray-600 text-sm">
                  If you don't get qualified leads within 30 days, we'll refund your entire subscription.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-8">VIP vs Regular Membership</h2>

          <div className="space-y-4">
            {[
              { feature: 'Access to verified leads', regular: true, vip: true },
              { feature: '1-hour early access to new leads', regular: false, vip: true },
              { feature: 'Priority customer support', regular: false, vip: true },
              { feature: 'Advanced analytics dashboard', regular: false, vip: true },
              { feature: 'Unlimited lead bidding', regular: true, vip: true },
              { feature: 'Bulk discount on lead unlocks', regular: false, vip: true },
              { feature: 'Dedicated account manager', regular: false, vip: true },
              { feature: 'Market insights & reports', regular: false, vip: true },
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 items-center py-3 border-b last:border-b-0">
                <div className="col-span-1 font-semibold">{item.feature}</div>
                <div className="text-center">
                  {item.regular ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full mx-auto" />
                  )}
                </div>
                <div className="text-center">
                  {item.vip ? (
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full mx-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 text-center font-bold">
            <div></div>
            <div className="text-gray-600">Regular</div>
            <div className="text-amber-600">VIP Premium</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Global Education Ltd',
              role: 'Study Abroad Agency',
              quote: 'VIP membership increased our conversion rate by 45%. Early access is game-changing!',
            },
            {
              name: 'Travel Hub BD',
              role: 'Travel Agency',
              quote: 'Best investment we made. Premium leads are worth every taka. ROI is excellent.',
            },
            {
              name: 'Tech Imports BD',
              role: 'Electronics Wholesaler',
              quote: 'Dedicated account manager helped us optimize our bidding strategy. Highly recommended!',
            },
          ].map((testimonial, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <div className="border-t pt-3">
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
