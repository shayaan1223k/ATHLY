import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../config/firebase';
import { setAuthTokenGetter } from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'register'

  // Wire token provider to apiClient whenever auth state changes
  useEffect(() => {
    if (currentUser) {
      setAuthTokenGetter(async () => {
        try {
          return await currentUser.getIdToken();
        } catch (err) {
          console.warn('[ATHLY AUTH] Could not obtain token from currentUser:', err);
          return null;
        }
      });
    } else {
      setAuthTokenGetter(null);
    }
  }, [currentUser]);

  // Subscribe to Firebase Auth state change if configured
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      // In unconfigured / preview mode, finish loading immediately
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const token = await user.getIdToken();
          setIdToken(token);
        } catch (e) {
          console.warn('[ATHLY AUTH] Error acquiring ID token on state change:', e.message);
        }
      } else {
        setIdToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (mode = 'signin') => {
    setAuthModalMode(mode);
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  const login = async (email, password) => {
    setAuthError(null);
    if (!isFirebaseConfigured || !auth) {
      // Demo / simulated authentication for local development & UI preview
      console.info('[ATHLY AUTH] Performing simulated local authentication (Firebase not configured)');
      const simulatedUser = {
        uid: 'dev-local-user',
        email: email || 'alex.hunter@example.com',
        displayName: (email && email.split('@')[0]) || 'Alex Hunter',
        getIdToken: async () => 'mock-dev-token'
      };
      setCurrentUser(simulatedUser);
      setIdToken('mock-dev-token');
      closeAuthModal();
      return { success: true, user: simulatedUser, isSimulated: true };
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const token = await cred.user.getIdToken();
      setIdToken(token);
      setCurrentUser(cred.user);
      closeAuthModal();
      return { success: true, user: cred.user };
    } catch (err) {
      let message = err.message;
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        message = 'Invalid email or password. Please verify your credentials.';
      } else if (err.code === 'auth/user-not-found') {
        message = 'No member dossier found for this email address.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Too many failed sign-in attempts. Please try again shortly.';
      }
      setAuthError(message);
      return { success: false, error: message };
    }
  };

  const register = async (email, password, displayName) => {
    setAuthError(null);
    if (!isFirebaseConfigured || !auth) {
      // Demo / simulated registration for local development & UI preview
      console.info('[ATHLY AUTH] Performing simulated local registration (Firebase not configured)');
      const simulatedUser = {
        uid: 'dev-local-user',
        email: email || 'alex.hunter@example.com',
        displayName: displayName || (email && email.split('@')[0]) || 'Alex Hunter',
        getIdToken: async () => 'mock-dev-token'
      };
      setCurrentUser(simulatedUser);
      setIdToken('mock-dev-token');
      closeAuthModal();
      return { success: true, user: simulatedUser, isSimulated: true };
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateFirebaseProfile(cred.user, { displayName });
      }
      const token = await cred.user.getIdToken();
      setIdToken(token);
      setCurrentUser(cred.user);
      closeAuthModal();
      return { success: true, user: cred.user };
    } catch (err) {
      let message = err.message;
      if (err.code === 'auth/email-already-in-use') {
        message = 'A member dossier already exists with this email address.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters for protocol security.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please provide a valid email format.';
      }
      setAuthError(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    setAuthError(null);
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn('[ATHLY AUTH] Sign-out error:', err.message);
      }
    }
    setCurrentUser(null);
    setIdToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        idToken,
        loading,
        authError,
        isAuthModalOpen,
        authModalMode,
        isFirebaseConfigured,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      currentUser: null,
      idToken: null,
      loading: false,
      authError: null,
      isAuthModalOpen: false,
      authModalMode: 'signin',
      isFirebaseConfigured: false,
      openAuthModal: () => {},
      closeAuthModal: () => {},
      login: async () => ({ success: false, error: 'AuthProvider not initialized' }),
      register: async () => ({ success: false, error: 'AuthProvider not initialized' }),
      logout: async () => {}
    };
  }
  return context;
};
