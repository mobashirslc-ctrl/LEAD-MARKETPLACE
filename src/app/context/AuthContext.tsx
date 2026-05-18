import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../data/categories';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: UserRole, categoryId: string) => boolean;
  logout: () => void;
  updateWallet: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Mock login - in real app would validate against backend
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string, role: UserRole, categoryId: string): boolean => {
    // Mock signup - creates new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      categoryId,
      isPremium: false,
      walletBalance: 0,
      totalEarnings: 0,
      leadsSubmitted: 0,
      leadsUnlocked: 0,
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateWallet = (amount: number) => {
    if (user) {
      setUser({
        ...user,
        walletBalance: user.walletBalance + amount,
        totalEarnings: amount > 0 ? user.totalEarnings + amount : user.totalEarnings,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateWallet }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
