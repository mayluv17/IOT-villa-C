'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

export type AuthContextType = {
  user: UserAttributes | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAttributes | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const data = await fetch('/api/get-session', {
          method: 'POST',
        });
        const res = await data.json();
        setUser(res);
      } catch (error) {
        setUser(null);
      }
    }

    getUser();
  }, []);

  return <AuthContext value={{ user }}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;
