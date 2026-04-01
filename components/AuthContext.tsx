import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  userRole: 'client' | 'admin' | null;
  onboardingComplete: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  onboardingComplete: false,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'client' | 'admin' | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Check if user exists in Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserRole(data.role);
          setOnboardingComplete(data.onboardingComplete || false);
        } else {
          // Create new user profile
          const isDefaultAdmin = firebaseUser.email === 'michaelfred124@gmail.com' && firebaseUser.emailVerified;
          const role = isDefaultAdmin ? 'admin' : 'client';
          
          await setDoc(userDocRef, {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || '',
            role: role,
            onboardingComplete: false,
            createdAt: new Date().toISOString()
          });
          
          setUserRole(role);
          setOnboardingComplete(false);
        }
      } else {
        setUser(null);
        setUserRole(null);
        setOnboardingComplete(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userRole, onboardingComplete, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
