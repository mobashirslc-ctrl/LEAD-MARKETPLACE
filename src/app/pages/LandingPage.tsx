import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { TrendingUp, Users, Shield, Wallet } from 'lucide-react';
import { categories } from '../data/categories';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center text-white font-bold text-xl">
              LM
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              LeadMarket BD
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outlined" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/signup')}
              sx={{
                background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ea580c 0%, #16a34a 100%)',
                },
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
          Bangladesh's First B2B Lead Marketplace
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Connect lead suppliers with businesses. Verified leads, transparent bidding, instant commissions.
          Stop wasting money on fake clicks - buy only real, verified customers.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/signup')}
            sx={{
              background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Start Selling Leads
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/signup')}
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Start Buying Leads
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <TrendingUp className="w-8 h-8" />, value: '50,000+', label: 'Verified Leads' },
            { icon: <Users className="w-8 h-8" />, value: '2,500+', label: 'Active Users' },
            { icon: <Shield className="w-8 h-8" />, value: '98%', label: 'Verification Rate' },
            { icon: <Wallet className="w-8 h-8" />, value: '৳1.2Cr', label: 'Commissions Paid' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-100 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-green-100 text-orange-600 mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Available Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all hover:scale-105 cursor-pointer ${
                category.color === 'orange' ? 'border-orange-200 hover:border-orange-400' : 'border-green-200 hover:border-green-400'
              }`}
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Avg. Lead Price:</span>
                <span className={`font-bold ${category.color === 'orange' ? 'text-orange-600' : 'text-green-600'}`}>
                  ৳{category.sampleLeadPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-r from-orange-50 to-green-50 rounded-3xl my-12">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Submit Verified Leads</h3>
            <p className="text-gray-600">
              Lead suppliers submit customer information. Our AI + Human team verifies via OTP before publishing.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Bid & Unlock</h3>
            <p className="text-gray-600">
              Businesses bid on leads. Winner pays unlock fee to see full contact details. Premium members get early access.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Earn Commissions</h3>
            <p className="text-gray-600">
              Lead suppliers get instant commission when their lead is sold. Money directly to digital wallet.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of businesses and lead suppliers already using LeadMarket BD
        </p>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/signup')}
          sx={{
            background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
            px: 6,
            py: 2,
            fontSize: '1.2rem',
          }}
        >
          Sign Up Now - It's Free
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2026 LeadMarket BD. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
