import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Title from "../Title";

const BlockLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const profileSnap = await getDoc(doc(db, "users", uid));
      const role = profileSnap.exists() ? profileSnap.data().role : null;

      if (role !== "police") {
        await signOut(auth);
        localStorage.removeItem("token");
        setError("Acesso negado. Este login não possui permissão para o painel policial.");
        return;
      }

      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      setError("");
      navigate("/home");
    } catch (err: unknown) {
      setError("Email ou senha incorreta");
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 justify-center mx-auto">
      <Title title="Login" />
      <input
        placeholder="Email"
        value={email}
        className="w-full text-base py-3 px-3 rounded-lg border border-[#d6dce8] bg-white focus:outline-none min-w-0"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        type="password"
        value={password}
        className="w-full text-base py-3 px-3 rounded-lg border border-[#d6dce8] bg-white focus:outline-none min-w-0"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={() => handleLogin()}
        className="w-full py-3 px-3 rounded-lg text-base font-semibold border-none bg-[#1e4ecb] text-white cursor-pointer transition-colors"
      >
        Entrar
      </button>
      {error && <p className="text-red text-sm mt-0 text-center w-full">{error}</p>}
    </div>
  );
};

export default BlockLogin;
