import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Title from "../Title";

const BlockLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
        className="w-full text-base py-3 px-3 rounded-lg border-none bg-gray focus:bg-red focus:outline-none min-w-0"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        type="password"
        value={password}
        className="w-full text-base py-3 px-3 rounded-lg border-none bg-gray focus:bg-red focus:outline-none min-w-0"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={() => handleLogin()}
        className="w-full py-3 px-3 rounded-lg text-base md:text-lg font-bold border-none bg-brand text-white cursor-pointer hover:bg-black transition-colors"
      >
        Entrar
      </button>
      {error && <p className="text-red text-sm mt-0 text-center w-full">{error}</p>}
    </div>
  );
};

export default BlockLogin;
