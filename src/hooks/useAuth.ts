import { useState, useEffect } from 'react';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

interface GoogleUser {
  email: string;
  name: string;
  imageUrl: string;
}

export function useAuth() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem('vodafone_auth');
    if (savedAuth) {
      setUser(JSON.parse(savedAuth));
    }
    setLoading(false);
  }, []);

  const signIn = async () => {
    // For demo purposes, simulate a successful login
    const mockUser = {
      email: 'demo@example.com',
      name: 'Demo User',
      imageUrl: 'https://ui-avatars.com/api/?name=Demo+User'
    };
    setUser(mockUser);
    localStorage.setItem('vodafone_auth', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vodafone_auth');
  };

  return {
    user,
    loading,
    signIn,
    logout
  };
}