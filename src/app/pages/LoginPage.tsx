import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from './gorun-logo.png';
import { Button, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 font-medium">Login to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #f97316 0%, #22c55e 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ea580c 0%, #16a34a 100%)',
                },
              }}
            >
              Login
            </Button>
          </form>

          <div className="mt-6">
            <div className="text-center text-sm text-gray-600 mb-4">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Sign Up
              </button>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 mb-2">Demo accounts:</p>
              <div className="space-y-2 text-xs">
                <div className="bg-gray-50 p-2 rounded">
                  <strong>Lead Supplier:</strong> arif@example.com
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <strong>Lead Collector:</strong> contact@globaledu.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
