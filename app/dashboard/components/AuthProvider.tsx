'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange } from '@/lib/auth';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if Supabase is configured
    const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://demo.supabase.co';

    if (!hasSupabase) {
      // Demo mode - create a mock user
      setUser({
        id: 'demo-user',
        email: 'demo@outcomeview.com',
        app_metadata: {},
        user_metadata: {
          full_name: 'Demo User',
          role: 'RN',
          role_color: '#22d3ee',
        },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as User);
      setLoading(false);
      return;
    }

    // Real Supabase auth
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
      
      // Redirect to login if no user
      if (!user && window.location.pathname !== '/login') {
        router.push('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

