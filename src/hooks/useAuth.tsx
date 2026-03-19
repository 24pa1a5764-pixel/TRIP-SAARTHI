import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile as updateFirebaseProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "@/integrations/firebase/client";

interface Profile {
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  avatar_url: string | null;
}

interface AppUser {
  id: string;
  email: string | null;
  user_metadata?: {
    full_name?: string | null;
  };
}

interface AuthContextType {
  user: AppUser | null;
  session: { provider: string } | null;
  profile: Profile | null;
  loading: boolean;
  needsOnboarding: boolean;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const profileKey = (userId: string) => `trip_profile_${userId}`;

const emptyProfile: Profile = {
  full_name: null,
  phone: null,
  address: null,
  city: null,
  latitude: null,
  longitude: null,
  avatar_url: null,
};

const mapFirebaseUser = (fbUser: FirebaseUser): AppUser => ({
  id: fbUser.uid,
  email: fbUser.email,
  user_metadata: {
    full_name: fbUser.displayName,
  },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<{ provider: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  const fetchProfile = async (userId: string, fallbackName?: string | null) => {
    const raw = localStorage.getItem(profileKey(userId));
    if (raw) {
      const parsed = JSON.parse(raw) as Profile;
      setProfile(parsed);
      setNeedsOnboarding(!parsed.full_name || (!parsed.address && !parsed.latitude));
      return;
    }

    const initialProfile: Profile = {
      ...emptyProfile,
      full_name: fallbackName ?? null,
    };
    setProfile(initialProfile);
    setNeedsOnboarding(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const appUser = mapFirebaseUser(fbUser);
        setUser(appUser);
        setSession({ provider: fbUser.providerData?.[0]?.providerId ?? "firebase" });
        await fetchProfile(appUser.id, appUser.user_metadata?.full_name ?? null);
      } else {
        setUser(null);
        setSession(null);
        setProfile(null);
        setNeedsOnboarding(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return { error: null };
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "Google sign-in failed.",
      };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Email sign-in failed." };
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (name.trim()) {
        await updateFirebaseProfile(result.user, { displayName: name.trim() });
      }
      return { error: null };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Email sign-up failed." };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setProfile(null);
    setNeedsOnboarding(false);
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return;
    const updated: Profile = {
      ...(profile ?? emptyProfile),
      ...data,
    };
    localStorage.setItem(profileKey(user.id), JSON.stringify(updated));
    setProfile(updated);
    setNeedsOnboarding(!updated.full_name || (!updated.address && !updated.latitude));
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user, session, profile, loading, needsOnboarding,
        signInWithGoogle, signInWithEmail, signUpWithEmail,
        signOut, updateProfile, refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
