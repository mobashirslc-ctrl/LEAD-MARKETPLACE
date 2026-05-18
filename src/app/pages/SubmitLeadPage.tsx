import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/categories';
import { ArrowLeft, CheckCircle, Smartphone } from 'lucide-react';

export default function SubmitLeadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  const category = categories.find(c => c.id === user.categoryId);

  const handleSendOTP = () => {
    setOtpSent(true);
    alert(`OTP sent to ${formData.customerPhone}`);
  };

  const handleVerifyOTP = () => {
    if (otp === '123456') {
      setStep(2);
    } else {
      alert('Invalid OTP. Try 123456 for demo.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Lead submitted successfully! You will earn commission when it is sold.');
    navigate('/dashboard');
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

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">{category?.icon}</div>
          <h1 className="text-3xl font-bold mb-2">Submit New Lead</h1>
          <p className="text-gray-600">{category?.name} Category</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="font-semibold">Verify Customer</span>
            </div>
            <div className="w-12 h-1 bg-gray-200" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="font-semibold">Lead Details</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-1">OTP Verification Required</h3>
                    <p className="text-sm text-blue-800">
                      We will send an OTP to the customer's phone to verify they are genuine.
                      This ensures 100% lead quality and prevents fake submissions.
                    </p>
                  </div>
                </div>
              </div>

              <TextField
                fullWidth
                label="Customer Full Name"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />

              <TextField
                fullWidth
                label="Customer Phone Number"
                required
                placeholder="+880 1712-345678"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                disabled={otpSent}
              />

              <TextField
                fullWidth
                label="Customer Email (Optional)"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                disabled={otpSent}
              />

              {!otpSent ? (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleSendOTP}
                  disabled={!formData.customerName || !formData.customerPhone}
                  sx={{
                    background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                  }}
                >
                  Send OTP to Customer
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-700 mb-1">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-bold">OTP Sent!</span>
                    </div>
                    <p className="text-sm text-green-600">
                      A 6-digit code has been sent to {formData.customerPhone}
                    </p>
                  </div>

                  <TextField
                    fullWidth
                    label="Enter OTP"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <p className="text-xs text-gray-500 text-center">
                    Demo: Use OTP <span className="font-bold">123456</span> to verify
                  </p>

                  <div className="flex gap-3">
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleVerifyOTP}
                      disabled={otp.length !== 6}
                      sx={{
                        background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                      }}
                    >
                      Verify & Continue
                    </Button>
                    <Button variant="outlined" onClick={() => setOtpSent(false)}>
                      Resend OTP
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-bold">Customer Verified Successfully!</span>
                </div>
              </div>

              <h3 className="font-bold text-lg">Lead Information</h3>

              {category?.visibleDataFields.map((field) => (
                <TextField
                  key={field}
                  fullWidth
                  label={field}
                  required
                  value={formData[field] || ''}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              ))}

              <TextField
                fullWidth
                label="Additional Notes"
                multiline
                rows={3}
                placeholder="Best time to call, special requirements, etc."
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />

              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-900 mb-2">Commission Breakdown</h4>
                <div className="space-y-1 text-sm text-orange-800">
                  <div className="flex justify-between">
                    <span>Lead Unlock Price:</span>
                    <span className="font-bold">৳{category?.sampleLeadPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Your Commission (50%):</span>
                    <span className="font-bold text-green-600">৳{(category?.sampleLeadPrice || 0) / 2}</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                }}
              >
                Submit Lead & Earn Commission
              </Button>
            </form>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-2xl font-bold text-green-600 mb-1">50%</div>
            <div className="text-sm text-gray-600">Commission Rate</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-2xl font-bold text-orange-600 mb-1">Instant</div>
            <div className="text-sm text-gray-600">Payout to Wallet</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow">
            <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">Verification Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
