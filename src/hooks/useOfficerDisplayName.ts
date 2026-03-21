import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

/** Nome do policial logado (campo `name` em `users/{uid}`), sem prefixos. */
export function useOfficerDisplayName(): string {
  const [name, setName] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setName("");
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = snap.exists() ? snap.data() : null;
        const n = typeof data?.name === "string" ? data.name.trim() : "";
        setName(n || (user.email?.split("@")[0] ?? ""));
      } catch {
        setName(user.email?.split("@")[0] ?? "");
      }
    });
    return () => unsub();
  }, []);

  return name;
}
