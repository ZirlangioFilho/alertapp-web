import { useEffect, useState } from "react";
import BlockLogin from "../../components/BlockLogin";
import BlockSignUp from "../../components/BlockSignUp";
import { AnimatePresence, motion } from "framer-motion";

import LogoDark from '../../assets/logo-dark.svg';
import Background from '../../assets/fundo-login.svg';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <section
      className="w-full min-h-screen flex flex-col md:flex-row md:items-center md:justify-end bg-primary overflow-x-hidden"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {/* Área de apresentação: só desktop */}
      <div className="hidden md:flex w-max self-start h-[80%] mt-6 ml-8 flex-col justify-between items-start flex-shrink-0">
        <img src={LogoDark} alt="Logo AlertApp" className="w-[150px]" />
        <div className="text-left">
          <h2 className="text-xl text-white cursor-default">Assistência para vítimas de violência doméstica</h2>
          <h2 className="text-xl text-white cursor-default">Combate a casos de incêndio</h2>
        </div>
      </div>

      {/* Formulário */}
      <div className="relative z-10 w-full md:w-[18%] md:min-w-[320px] max-w-md md:max-w-none md:mr-16 mx-auto bg-white flex min-h-[80vh] md:min-h-0 md:h-screen flex-col items-center justify-center py-8 md:py-0 px-6 md:px-16 flex-shrink-0">
        <img src={LogoDark} alt="Logo AlertApp" className="w-24 h-auto md:hidden mb-4" />

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <BlockLogin />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <BlockSignUp />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <p className="text-sm cursor-default text-black">
            {isLogin ? "Ainda não possui conta?" : "Já possui conta?"}
          </p>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-brand cursor-pointer bg-transparent border-none p-0 underline"
          >
            {isLogin ? "Cadastre-se" : "Entrar"}
          </button>
        </div>
      </div>
    </section>
  );
}
