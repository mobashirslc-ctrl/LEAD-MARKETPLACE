import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/categories';
import { mockLeads, mockTransactions } from '../data/mockData';
import {
  LogOut,
  Wallet,
  TrendingUp,
  Plus,
  Filter,
  Star,
  Clock,
  CheckCircle,
  Users,
  DollarSign,
  Eye,
} from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'leads' | 'wallet' | 'transactions'>('leads');

  if (!user) {
    navigate('/login');
    return null;
  }

  const category = categories.find(c => c.id === user.categoryId);
  const categoryLeads = mockLeads.filter(l => l.categoryId === user.categoryId);
  const recentTransactions = mockTransactions.slice(0, 5);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center text-white font-bold text-xl">
                  LM
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  LeadMarket BD
                </span>
              </div>
              <Chip
                label={category?.name}
                icon={<span className="text-lg">{category?.icon}</span>}
                color={category?.color === 'orange' ? 'warning' : 'success'}
                size="small"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-green-100 px-4 py-2 rounded-lg">
                <Wallet className="w-5 h-5 text-orange-600" />
                <div className="text-right">
                  <div className="text-xs text-gray-600">Wallet Balance</div>
                  <div className="font-bold text-orange-600">৳{user.walletBalance.toLocaleString()}</div>
                </div>
              </div>

              {user.isPremium && (
                <Chip
                  icon={<Star className="w-4 h-4" />}
                  label="VIP Premium"
                  sx={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              )}

              <Button
                variant="outlined"
                onClick={handleLogout}
                startIcon={<LogOut className="w-4 h-4" />}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{user.totalEarnings?.toLocaleString() || 0}</div>
            <div className="text-sm text-gray-600">Total Earnings</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                {user.role === 'supplier' ? <Plus className="w-6 h-6 text-green-600" /> : <Eye className="w-6 h-6 text-green-600" />}
              </div>
              <span className="text-xs text-gray-500">Count</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {user.role === 'supplier' ? user.leadsSubmitted : user.leadsUnlocked}
            </div>
            <div className="text-sm text-gray-600">
              {user.role === 'supplier' ? 'Leads Submitted' : 'Leads Unlocked'}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{categoryLeads.length}</div>
            <div className="text-sm text-gray-600">Available Leads</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-gray-500">Wallet</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">৳{user.walletBalance.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Current Balance</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedTab === 'leads' ? 'contained' : 'outlined'}
            onClick={() => setSelectedTab('leads')}
            sx={selectedTab === 'leads' ? {
              background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
            } : {}}
          >
            {user.role === 'supplier' ? 'My Leads' : 'Browse Leads'}
          </Button>
          <Button
            variant={selectedTab === 'wallet' ? 'contained' : 'outlined'}
            onClick={() => setSelectedTab('wallet')}
            sx={selectedTab === 'wallet' ? {
              background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
            } : {}}
          >
            Wallet
          </Button>
          <Button
            variant={selectedTab === 'transactions' ? 'contained' : 'outlined'}
            onClick={() => setSelectedTab('transactions')}
            sx={selectedTab === 'transactions' ? {
              background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
            } : {}}
          >
            Transactions
          </Button>

          <div className="ml-auto flex gap-2">
            {user.role === 'supplier' && (
              <Button
                variant="contained"
                onClick={() => navigate('/submit-lead')}
                startIcon={<Plus className="w-4 h-4" />}
                sx={{
                  background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                }}
              >
                Submit New Lead
              </Button>
            )}
            {user.role === 'collector' && !user.isPremium && (
              <Button
                variant="contained"
                onClick={() => navigate('/premium')}
                startIcon={<Star className="w-4 h-4" />}
                sx={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                }}
              >
                Upgrade to VIP
              </Button>
            )}
          </div>
        </div>

        {/* Content Area */}
        {selectedTab === 'leads' && (
          <div className="space-y-4">
            {categoryLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:border-orange-300 transition-all cursor-pointer"
                onClick={() => navigate(`/lead/${lead.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">Lead #{lead.id.slice(-6).toUpperCase()}</h3>

                      {lead.verificationStatus === 'verified-gold' && (
                        <Chip
                          icon={<CheckCircle className="w-3 h-3" />}
                          label="Verified Gold"
                          size="small"
                          sx={{ background: '#22c55e', color: 'white', fontWeight: 'bold' }}
                        />
                      )}

                      {lead.isPremiumExclusive && (
                        <Chip
                          icon={<Star className="w-3 h-3" />}
                          label="VIP Exclusive"
                          size="small"
                          sx={{ background: '#fbbf24', color: 'white', fontWeight: 'bold' }}
                        />
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-3">Submitted by: {lead.submittedBy}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(lead.data).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-2 rounded">
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                          <div className="text-sm font-semibold">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-xs text-gray-500 mb-1">Unlock Price</div>
                    <div className="text-2xl font-bold text-orange-600 mb-2">৳{lead.unlockPrice}</div>

                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <Users className="w-4 h-4" />
                      <span>{lead.bidCount} bids</span>
                    </div>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>

                {lead.isPremiumExclusive && lead.exclusiveUntil && (
                  <div className="mt-3 pt-3 border-t flex items-center gap-2 text-sm text-amber-600">
                    <Clock className="w-4 h-4" />
                    <span>VIP exclusive until {lead.exclusiveUntil.toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'wallet' && (
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-green-100 mb-4">
                <Wallet className="w-10 h-10 text-orange-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">৳{user.walletBalance.toLocaleString()}</h2>
              <p className="text-gray-600">Available Balance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">৳{user.totalEarnings.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Earnings</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {user.role === 'supplier' ? user.leadsSubmitted : user.leadsUnlocked}
                </div>
                <div className="text-sm text-gray-600">
                  {user.role === 'supplier' ? 'Leads Sold' : 'Leads Purchased'}
                </div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">৳{category?.sampleLeadPrice}</div>
                <div className="text-sm text-gray-600">Avg. Lead Value</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                  px: 4,
                }}
              >
                Withdraw to Bank
              </Button>
            </div>
          </div>
        )}

        {selectedTab === 'transactions' && (
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="bg-white rounded-xl p-4 shadow border-2 border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    tx.amount > 0 ? 'bg-green-100' : 'bg-orange-100'
                  }`}>
                    <DollarSign className={`w-6 h-6 ${tx.amount > 0 ? 'text-green-600' : 'text-orange-600'}`} />
                  </div>
                  <div>
                    <div className="font-semibold">{tx.description}</div>
                    <div className="text-sm text-gray-500">{tx.timestamp.toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                    {tx.amount > 0 ? '+' : ''}৳{Math.abs(tx.amount).toLocaleString()}
                  </div>
                  <Chip
                    label={tx.status}
                    size="small"
                    color={tx.status === 'completed' ? 'success' : 'warning'}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
