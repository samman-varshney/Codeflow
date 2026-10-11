import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('codeflow_token') || null);
  const [loading, setLoading] = useState(true);

  // Check token on mount and validate with GET /api/auth/me
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('codeflow_token');
      if (!storedToken) {
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user || data);
          setToken(storedToken);
        } else {
          // Token invalid or expired
          localStorage.removeItem('codeflow_token');
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error('Failed to validate auth token:', error);
        // If server is unreachable or fails, retain stored token or clear?
        // Fallback: clear if unauthorized or keep local state gracefully
        setUser(null);
        setToken(null);
        localStorage.removeItem('codeflow_token');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to login');
    }

    const authToken = data.token;
    const authUser = data.user || { email, name: data.name };

    localStorage.setItem('codeflow_token', authToken);
    setToken(authToken);
    setUser(authUser);
    return data;
  };

  const signup = async (name, email, password) => {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to sign up');
    }

    const authToken = data.token;
    const authUser = data.user || { name, email };

    localStorage.setItem('codeflow_token', authToken);
    setToken(authToken);
    setUser(authUser);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('codeflow_token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

