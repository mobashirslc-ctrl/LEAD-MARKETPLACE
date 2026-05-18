import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { TrendingUp, Users, Shield, Wallet } from 'lucide-react';
import { categories } from '../data/categories';

// ল্যান্ডিং পেজের সেম ডিরেক্টরি থেকে লোগো ইমেজটি ইম্পোর্ট করা হলো
import logoImg from './gorun-logo.png';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src={logoImg} 
              alt="GLead Logo" 
              className="w-10 h-10 object-contain rounded-lg shadow-sm"
            />
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
              GLead
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
      <section className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        {/* Big Central Logo */}
        <div className="mb-6 p-4 bg-white/50 backdrop-blur-md rounded-3xl shadow-xl border border-green-100 animate-bounce-slow">
          <img 
            src={logoImg} 
            alt="GLead Large Logo" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-orange-600 via-green-600 to-emerald-700 bg-clip-text text-transparent tracking-tight">
          Bangladesh's First B2B Lead Marketplace
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-medium">
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
              fontWeight: 'bold'
            }}
          >
            Start Selling Leads
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/signup')}
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
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
            <div key={i} className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border-2 border-orange-100 text-center transition-all hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-green-100 text-green-600 mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Available Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all hover:scale-105 cursor-pointer ${
                category.color === 'orange' ? 'border-orange-200 hover:border-orange-400' : 'border-green-200 hover:border-green-400'
              }`}
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <div className="flex items-center justify-between text-sm border-t pt-3 mt-2">
                <span className="text-gray-500 font-medium">Avg. Lead Price:</span>
                <span className={`font-black text-base ${category.color === 'orange' ? 'text-orange-600' : 'text-green-600'}`}>
                  ৳{category.sampleLeadPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-r from-orange-50 to-green-50 rounded-3xl my-12 border border-green-100/50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-md">
              1
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Submit Verified Leads</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lead suppliers submit customer information. Our AI + Human team verifies via OTP before publishing.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-md">
              2
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Bid & Unlock</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Businesses bid on leads. Winner pays unlock fee to see full contact details. Premium members get early access.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-md">
              3
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Earn Commissions</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lead suppliers get instant commission when their lead is sold. Money directly to digital wallet.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Ready to Transform Your Business?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of businesses and lead suppliers already using GLead
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
            fontWeight: 'bold',
            borderRadius: '12px'
          }}
        >
          Sign Up Now - It's Free
        </Button>
      </section>

      {/* 📊 NEW PRO FOOTER: 10 Core Options Organized */}
      <footer className="border-t bg-slate-900 text-gray-300 mt-20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
          
          {/* Brand Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="GLead Logo Footer" className="w-8 h-8 object-contain brightness-110" />
              <span className="text-xl font-black text-white tracking-wider">GLead BD</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Bangladesh's premier decentralized B2B lead generation & transparent exchange marketplace.
            </p>
          </div>

          {/* Column 1: Company (4 Options) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer transition">1. About Us</span></li>
              <li><span className="hover:text-white cursor-pointer transition">2. Careers</span></li>
              <li><span className="hover:text-white cursor-pointer transition">3. Success Stories</span></li>
              <li><span className="hover:text-white cursor-pointer transition">4. Press & Media</span></li>
            </ul>
          </div>

          {/* Column 2: Ecosystem (3 Options) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-green-500 pl-2">Ecosystem</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer transition">5. Our Services</span></li>
              <li><span className="hover:text-white cursor-pointer transition">6. B2B Blog</span></li>
              <li><span className="hover:text-white cursor-pointer transition">7. Premium Subscriptions</span></li>
            </ul>
          </div>

          {/* Column 3: Contact & Legal (3 Options - Total 10) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">Contact & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white font-semibold text-orange-400 cursor-pointer transition">8. Contact Support</span></li>
              <li><span className="hover:text-white cursor-pointer transition">9. Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer transition">10. Terms of Service</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
          <p>© 2026 GLead Marketplace. All rights reserved.</p>
          <p>Engineered for high-transparency businesses.</p>
        </div>
      </footer>