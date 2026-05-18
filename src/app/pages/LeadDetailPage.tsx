import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { mockLeads, mockBids } from '../data/mockData';
import { categories } from '../data/categories';
import {
  ArrowLeft,
  CheckCircle,
  Star,
  Clock,
  Users,
  Lock,
  Unlock,
  TrendingUp,
  Shield,
} from 'lucide-react';

export default function LeadDetailPage() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const { user, updateWallet } = useAuth();
  const [bidAmount, setBidAmount] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);

  const lead = mockLeads.find(l => l.id === leadId);
  const leadBids = mockBids.filter(b => b.leadId === leadId);

  if (!lead || !user) {
    navigate('/dashboard');
    return null;
  }

  const category = categories.find(c => c.id === lead.categoryId);

  const handlePlaceBid = () => {
    const amount = parseInt(bidAmount);
    if (amount >= lead.unlockPrice) {
      alert(`Bid placed successfully for ৳${amount}!`);
      setShowBidForm(false);
      setBidAmount('');
    }
  };

  const handleUnlockLead = () => {
    if (user.walletBalance >= lead.unlockPrice) {
      updateWallet(-lead.unlockPrice);
      setIsUnlocked(true);
      alert('Lead unlocked successfully! Contact details revealed.');
    } else {
      alert('Insufficient wallet balance. Please add funds.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
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

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Lead Header */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{category?.icon}</span>
                <div>
                  <h1 className="text-3xl font-bold">Lead #{lead.id.slice(-6).toUpperCase()}</h1>
                  <p className="text-gray-600">{category?.name}</p>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                {lead.verificationStatus === 'verified-gold' && (
                  <Chip
                    icon={<CheckCircle className="w-4 h-4" />}
                    label="Verified Gold Lead"
                    sx={{ background: '#22c55e', color: 'white', fontWeight: 'bold' }}
                  />
                )}

                {lead.isPremiumExclusive && (
                  <Chip
                    icon={<Star className="w-4 h-4" />}
                    label="VIP Exclusive"
                    sx={{ background: '#fbbf24', color: 'white', fontWeight: 'bold' }}
                  />
                )}

                <Chip
                  icon={<Shield className="w-4 h-4" />}
                  label="OTP Verified"
                  color="success"
                  variant="outlined"
                />
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Unlock Price</div>
              <div className="text-4xl font-bold text-orange-600 mb-2">৳{lead.unlockPrice}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{lead.bidCount} active bids</span>
              </div>
            </div>
          </div>

          {/* Verification Info */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-green-900 mb-1">100% Verified Lead</h3>
                <p className="text-sm text-green-800">
                  This lead has been verified through OTP confirmation by our verification team.
                  Customer confirmed interest on {lead.submittedAt.toLocaleDateString()}.
                </p>
              </div>
            </div>
          </div>

          {/* Lead Data */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">Customer Requirements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(lead.data).map(([key, value]) => (
                <div key={key} className="bg-gradient-to-br from-orange-50 to-green-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 capitalize mb-1">{key}</div>
                  <div className="font-semibold text-lg">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                <span className="font-semibold">Submitted by:</span> {lead.submittedBy}
              </div>
              <div>
                <span className="font-semibold">Posted:</span> {lead.submittedAt.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Information (Locked/Unlocked) */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                {isUnlocked ? <Unlock className="w-5 h-5 text-green-600" /> : <Lock className="w-5 h-5 text-orange-600" />}
                Contact Information
              </h3>

              {!isUnlocked ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-10 h-10 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Unlock to View Contact Details</h4>
                  <p className="text-gray-600 mb-6">
                    Get full access to customer name, phone number, email, and additional notes
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
                    <div className="text-sm text-gray-600 mb-2">Unlock Price</div>
                    <div className="text-3xl font-bold text-orange-600 mb-4">৳{lead.unlockPrice}</div>
                    <div className="text-sm text-gray-600">
                      Your Balance: <span className="font-bold">৳{user.walletBalance.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleUnlockLead}
                    disabled={user.walletBalance < lead.unlockPrice}
                    startIcon={<Unlock className="w-5 h-5" />}
                    sx={{
                      background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                      px: 6,
                      py: 1.5,
                    }}
                  >
                    Unlock Now
                  </Button>

                  {user.walletBalance < lead.unlockPrice && (
                    <p className="text-sm text-red-600 mt-3">Insufficient balance. Please add funds to your wallet.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-bold">Lead Unlocked Successfully!</span>
                    </div>
                    <p className="text-sm text-green-600">You now have full access to this customer's information.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Full Name</div>
                      <div className="font-bold">মোঃ করিম উদ্দিন</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Phone Number</div>
                      <div className="font-bold">+880 1712-345678</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Email</div>
                      <div className="font-bold">karim@example.com</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Best Time to Call</div>
                      <div className="font-bold">Evening (6-8 PM)</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Additional Notes</div>
                    <div className="text-sm">
                      Customer is actively looking for options and ready to make a decision within 2 weeks.
                      Prefers communication via WhatsApp.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bidding Section */}
          <div className="space-y-6">
            {/* Current Bids */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Active Bids ({leadBids.length})
              </h3>

              <div className="space-y-3 mb-4">
                {leadBids.map((bid, index) => (
                  <div key={bid.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{bid.userName}</span>
                      <Chip
                        label={`#${index + 1}`}
                        size="small"
                        color={index === 0 ? 'success' : 'default'}
                      />
                    </div>
                    <div className="text-orange-600 font-bold">৳{bid.amount}</div>
                    <div className="text-xs text-gray-500">{bid.timestamp.toLocaleTimeString()}</div>
                  </div>
                ))}
              </div>

              {user.role === 'collector' && !showBidForm && (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setShowBidForm(true)}
                  sx={{
                    background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                  }}
                >
                  Place Bid
                </Button>
              )}

              {showBidForm && (
                <div className="space-y-3">
                  <TextField
                    fullWidth
                    label="Your Bid Amount"
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    helperText={`Minimum: ৳${lead.unlockPrice}`}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handlePlaceBid}
                      disabled={!bidAmount || parseInt(bidAmount) < lead.unlockPrice}
                      sx={{
                        background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                      }}
                    >
                      Submit Bid
                    </Button>
                    <Button variant="outlined" onClick={() => setShowBidForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Premium Exclusive Timer */}
            {lead.isPremiumExclusive && lead.exclusiveUntil && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-amber-600" />
                  <h4 className="font-bold text-amber-900">VIP Exclusive</h4>
                </div>
                <p className="text-sm text-amber-800 mb-3">
                  Only premium members can bid on this lead for the next hour
                </p>
                <div className="flex items-center gap-2 text-amber-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    Until {lead.exclusiveUntil.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
