import React, { createContext, useContext, useEffect, useState } from 'react';

interface MockUser {
  id: string;
  email: string;
  user_metadata?: any;
}

interface MockSession {
  user: MockUser;
  access_token: string;
}

interface AuthContextType {
  user: MockUser | null;
  session: MockSession | null;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const STORAGE_KEY = 'mock_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<MockSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load session from localStorage
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession);
        setSession(parsedSession);
        setUser(parsedSession.user);
      } catch (e) {
        console.error('Failed to parse saved session:', e);
      }
    }
    setLoading(false);
  }, []);

  const createMockUser = (email: string, metadata?: any): MockUser => {
    return {
      id: `user_${Date.now()}`,
      email,
      user_metadata: metadata || {}
    };
  };

  const saveSession = (newSession: MockSession) => {
    setSession(newSession);
    setUser(newSession.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const mockUser = createMockUser(email, {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        license_plate: userData.licensePlate,
        km_stand: userData.kmStand
      });

      const mockSession: MockSession = {
        user: mockUser,
        access_token: 'mock_token_' + Date.now()
      };

      saveSession(mockSession);
      
      return { data: { user: mockUser, session: mockSession }, error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // For demo, just create a session with the email provided
      const mockUser = createMockUser(email || 'demo@example.com');

      const mockSession: MockSession = {
        user: mockUser,
        access_token: 'mock_token_' + Date.now()
      };

      saveSession(mockSession);
      
      return { data: { user: mockUser, session: mockSession }, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setSession(null);
      localStorage.removeItem(STORAGE_KEY);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Mock password reset
      return { data: { message: 'Password reset email sent (mock)' }, error: null };
    } catch (error: any) {
      console.error('Reset password error:', error);
      return { data: null, error };
    }
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    resetPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
