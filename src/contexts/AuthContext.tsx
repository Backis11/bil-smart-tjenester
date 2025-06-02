
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // When user confirms email and logs in, create car if it doesn't exist
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(async () => {
            await createCarFromUserMetadata(session.user);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const createCarFromUserMetadata = async (user: User) => {
    try {
      const licensePlate = user.user_metadata?.license_plate;
      const kmStand = user.user_metadata?.km_stand;
      
      if (!licensePlate) {
        console.log('No license plate in user metadata, skipping car creation');
        return;
      }

      // Check if car already exists
      const { data: existingCar, error: checkError } = await supabase
        .from('cars')
        .select('id')
        .eq('user_id', user.id)
        .eq('license_plate', licensePlate)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing car:', checkError);
        return;
      }

      if (existingCar) {
        console.log('Car already exists for user');
        return;
      }

      // Create new car
      const { error } = await supabase
        .from('cars')
        .insert({
          user_id: user.id,
          license_plate: licensePlate,
          mileage: kmStand ? parseInt(kmStand) : null,
          status: 'active'
        });

      if (error) {
        console.error('Error creating car:', error);
      } else {
        console.log('Car created successfully for user');
      }
    } catch (error) {
      console.error('Error in createCarFromUserMetadata:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone,
            license_plate: userData.licensePlate,
            km_stand: userData.kmStand
          }
        }
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      return { data, error: null };
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
