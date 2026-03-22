import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

type AuthState = {
  loading: boolean;
  user: User | null;
  /** Policial com `users/{uid}.role === "police"` */
  isPolice: boolean;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    loading: true,
    user: null,
    isPolice: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        localStorage.removeItem("token");
        setState({ loading: false, user: null, isPolice: false });
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const role = snap.exists() ? snap.data().role : null;
        if (role === "police") {
          const token = await user.getIdToken();
          localStorage.setItem("token", token);
          setState({ loading: false, user, isPolice: true });
        } else {
          await signOut(auth);
          localStorage.removeItem("token");
          setState({ loading: false, user: null, isPolice: false });
        }
      } catch {
        await signOut(auth);
        localStorage.removeItem("token");
        setState({ loading: false, user: null, isPolice: false });
      }
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
}
