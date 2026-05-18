import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from './gorun-logo.png';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { categories, UserRole } from '../data/categories';
import { ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as UserRole | '',
    categoryId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      if (formData.role && formData.categoryId) {
        signup(formData.name, formData.email, formData.password, formData.role, formData.categoryId);
        navigate('/dashboard');
      }
    }
  };

  const selectedCategory = categories.find(c => c.id === formData.categoryId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src={logoImg} 
              alt="GLead Logo" 
              className="w-12 h-12 object-contain rounded-lg"
            />
            <span className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent tracking-tight">
              GLead
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Create Your Account</h1>
          <p className="text-gray-500 font-medium">Step {step} of 3</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step
                    ? s === step
                      ? 'bg-gradient-to-r from-orange-500 to-green-500'
                      : 'bg-green-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Basic Information</h2>
                <TextField
                  fullWidth
                  label="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            )}

            {/* Step 2: Select Role */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Choose Your Role</h2>
                <p className="text-gray-600 mb-6">
                  Select how you want to use the platform
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setFormData({ ...formData, role: 'supplier' })}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                      formData.role === 'supplier'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-4xl mb-3">📤</div>
                    <h3 className="font-bold text-lg mb-2">Lead Supplier</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Submit leads and earn commissions when they're sold
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>✓ Instant commission payouts</li>
                      <li>✓ No upfront costs</li>
                      <li>✓ Work from anywhere</li>
                    </ul>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, role: 'collector' })}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                      formData.role === 'collector'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="text-4xl mb-3">📥</div>
                    <h3 className="font-bold text-lg mb-2">Lead Collector</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Buy verified leads to grow your business
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>✓ 100% verified customers</li>
                      <li>✓ Pay only for unlocked leads</li>
                      <li>✓ Premium early access</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Select Category */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Select Your Industry</h2>
                <p className="text-gray-600 mb-6">
                  Your dashboard will show only leads from this category
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => setFormData({ ...formData, categoryId: category.id })}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        formData.categoryId === category.id
                          ? category.color === 'orange'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <h3 className="font-bold mb-1">{category.name}</h3>
                      <p className="text-xs text-gray-600">{category.description}</p>
                    </div>
                  ))}
                </div>

                {selectedCategory && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold mb-2 text-sm">What you'll see:</h4>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-gray-600 mb-1">
                          {formData.role === 'supplier' ? 'Who will buy:' : 'Lead sources:'}
                        </p>
                        <ul className="space-y-1">
                          {(formData.role === 'supplier'
                            ? selectedCategory.leadCollectors
                            : selectedCategory.leadSuppliers
                          ).map((item, i) => (
                            <li key={i} className="text-gray-700">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Lead data fields:</p>
                        <ul className="space-y-1">
                          {selectedCategory.visibleDataFields.slice(0, 4).map((field, i) => (
                            <li key={i} className="text-gray-700">• {field}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button
                  variant="outlined"
                  onClick={() => setStep(step - 1)}
                  startIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth={step === 1}
                disabled={
                  (step === 2 && !formData.role) ||
                  (step === 3 && !formData.categoryId)
                }
                sx={{
                  background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ea580c 0%, #16a34a 100%)',
                  },
                }}
              >
                {step === 3 ? 'Create Account' : 'Continue'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
