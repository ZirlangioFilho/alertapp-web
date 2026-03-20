import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Title from "../Title";

const BlockSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao cadastrar");
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 justify-center mx-auto">
      <Title title="Cadastro" />

      <input
        placeholder="Digite seu email"
        value={email}
        className="w-full text-base py-3 px-3 rounded-lg border-none bg-gray focus:bg-red focus:outline-none min-w-0"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Crie uma senha"
        type="password"
        value={password}
        className="w-full text-base py-3 px-3 rounded-lg border-none bg-gray focus:bg-red focus:outline-none min-w-0"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        placeholder="Confirmar senha"
        type="password"
        value={confirmPassword}
        className="w-full text-base py-3 px-3 rounded-lg border-none bg-gray focus:bg-red focus:outline-none min-w-0"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        type="button"
        onClick={handleSignUp}
        className="w-full py-3 px-3 rounded-lg text-base md:text-lg font-bold border-none bg-brand text-white cursor-pointer hover:bg-black transition-colors"
      >
        Cadastrar
      </button>

      {error && <p className="text-red text-sm mt-0 text-center w-full break-words">{error}</p>}
    </div>
  );
};

export default BlockSignUp;
