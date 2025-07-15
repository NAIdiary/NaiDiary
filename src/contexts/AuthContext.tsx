import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { getUserById, createUser, updateUserProfile, ensureUserProfile } from '../lib/supabase';

// Utilitário para gerar deviceId único
function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem('nai-diary-device-id');
  if (!deviceId) {
    deviceId = `${window.navigator.userAgent}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem('nai-diary-device-id', deviceId);
  }
  return deviceId;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<any>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Checa sessão ativa ao montar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch (e) {
        console.error('Session check error:', e);
      } finally {
        setLoading(false);
      }
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      console.log('SIGNUP RESULT:', { data, error });

      if (error) throw error;

      // Garante perfil após cadastro
      if (data.user) {
        console.log('Chamando ensureUserProfile com:', data.user.email);
        await ensureUserProfile({ id: data.user.id, email: data.user.email || '' });
      } else {
        console.log('data.user está vazio após signUp');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      console.log('SIGNIN RESULT:', { data, error });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
        console.log('Chamando ensureUserProfile com:', data.user.email);
        await ensureUserProfile({ id: data.user.id, email: data.user.email || '' });
      } else {
        console.log('data.user está vazio após signIn');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    await supabase.auth.signOut();
  };

  const updateUser = async (userData: Partial<any>) => {
    if (user) {
      try {
        await updateUserProfile(user.id, userData);
        // Atualiza o estado local se necessário
      } catch (error) {
        console.error('Update user error:', error);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signUp, 
      signIn, 
      logout, 
      updateUser, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};