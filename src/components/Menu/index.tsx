import { useState } from 'react'
import Logo from '../../assets/logo.svg'
import { Buttons, type ButtonType } from '../../constants/buttons'
import { useNavigate } from 'react-router-dom'
import ExitConfirm from '../ExitConfirm'
import { AnimatePresence, motion } from "framer-motion"

type MenuProps = {
  active: ButtonType;
  setActive: (active: ButtonType) => void;
  /** Nome do policial logado (apenas o nome, sem cargo). */
  officerName?: string;
}

export const Menu = ({ active, setActive, officerName = "" }: MenuProps) => {
  const [exit, setExit] = useState(true)

  const navigate = useNavigate()

  function handleToLogin() {
    localStorage.removeItem("token")
    navigate("/login")
  }
  function handleReport() {
    navigate("/report")
  }

  function handleToConfirm() {
    setExit(!exit)
  }

  return (
    <>
      {/* Mobile: barra no topo */}
      <div className="md:hidden h-full w-full bg-[#14233b] py-3 px-3 flex flex-col gap-3 shrink-0">
        <div className="flex items-center justify-between">
          <img src={Logo} alt="Logo" className="w-16 h-auto" />
          <button
            type="button"
            onClick={handleReport}
            className="border-none bg-[#1e4ecb] text-sm py-2 px-3 rounded-lg text-white font-semibold"
          >
            Relatório
          </button>
          
        </div>
        <div className="flex flex-wrap gap-2">
          {Buttons.map((button) => (
            <button
              key={button}
              type="button"
              onClick={() => setActive(button as ButtonType)}
              className={`border-none text-left bg-transparent text-sm cursor-pointer py-2 px-2 rounded-lg transition-colors ${
                active === button ? 'font-semibold text-white bg-white/14' : 'text-[#9aa4b2]'
              }`}
            >
              {button}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <AnimatePresence mode="wait">
            {exit ? (
              <motion.div
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  type="button"
                  onClick={() => handleToConfirm()}
                  className="text-sm bg-[#f24858] text-white border-none py-1.5 px-3 rounded-lg font-semibold"
                >
                  Sair
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ExitConfirm
                  exit={() => handleToLogin()}
                  noExit={() => setExit(!exit)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop: sidebar */}
      <div className="hidden md:flex bg-[#14233b] py-8 px-4 w-[250px] min-w-[240px] h-screen flex-col justify-between items-start shrink-0">
        <div className="w-full">
          <img src={Logo} alt="Logo" className="pt-0 w-[110px] h-auto block mb-10" />
          <p className="text-[11px] uppercase tracking-wide text-[#9aa4b2] font-semibold mb-3 px-2">Principal</p>
          <div className="flex flex-col gap-2 items-start">
            {Buttons.map((button) => (
              <button
                key={button}
                type="button"
                onClick={() => setActive(button as ButtonType)}
                className={`border-none text-left bg-transparent text-sm cursor-pointer transition-colors duration-300 w-full px-3 py-3 rounded-lg flex items-center gap-2 ${
                  active === button ? 'font-semibold text-white bg-white/12 border-l-4 border-[#2f66e4]' : 'font-normal text-[#9aa4b2]'
                }`}
              >
                <span className={active === button ? 'text-[#8eb0ff]' : 'text-[#7f8896]'}>{button === "Relato de problemas" ? "▣" : "△"}</span>
                {button}
              </button>
            ))}
            <button
              type="button"
              onClick={handleReport}
              className="border-none bg-[#1e4ecb] text-sm cursor-pointer py-3 px-3 text-white font-semibold rounded-lg mt-3 w-full"
            >
              Relatório
            </button>
          </div>
        </div>
        <div className="flex p-3 items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {exit ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full bg-[#1c2c47] rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#3c82f6]" />
                    <p className="text-xs text-white font-semibold truncate max-w-[160px]" title={officerName}>
                      {officerName || "—"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToConfirm()}
                    className="text-xs bg-[#f24858] text-white border-none py-2 px-4 rounded-lg font-semibold cursor-pointer w-full"
                  >
                    Sair
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ExitConfirm
                  exit={() => handleToLogin()}
                  noExit={() => setExit(!exit)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
