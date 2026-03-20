import { useState } from 'react'
import Logo from '../../assets/logo.svg'
import { Buttons, type ButtonType } from '../../constants/buttons'
import { useNavigate } from 'react-router-dom'
import ExitConfirm from '../ExitConfirm'
import { AnimatePresence, motion } from "framer-motion"

type MenuProps = {
  active: ButtonType;
  setActive: (active: ButtonType) => void;
}

export const Menu = ({ active, setActive }: MenuProps) => {
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
      <div className="md:hidden w-full bg-primary py-3 px-3 flex flex-col gap-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <img src={Logo} alt="Logo" className="w-16 h-auto" />
          <button
            type="button"
            onClick={handleReport}
            className="border-none bg-white text-sm py-1.5 px-2 rounded-lg text-black font-bold"
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
              className={`border-none text-left bg-transparent text-sm cursor-pointer py-1 px-2 rounded ${
                active === button ? 'font-bold text-white bg-white/20' : 'text-dark-gray'
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
                  className="text-sm bg-red text-gray border-none py-1 px-2 rounded font-bold hover:bg-gray hover:text-red"
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
      <div className="hidden md:flex bg-primary py-6 px-3 w-1/5 min-w-[180px] max-w-[240px] h-screen flex-col justify-between items-start flex-shrink-0">
        <div className="w-full">
          <img src={Logo} alt="Logo" className="py-6 pt-0 w-[100px] h-auto block" />
          <div className="flex flex-col gap-6 items-start">
            {Buttons.map((button) => (
              <button
                key={button}
                type="button"
                onClick={() => setActive(button as ButtonType)}
                className={`border-none text-left bg-transparent text-base cursor-pointer transition-colors duration-300 w-full ${
                  active === button ? 'font-bold text-white' : 'font-normal text-dark-gray'
                }`}
              >
                {button}
              </button>
            ))}
            <button
              type="button"
              onClick={handleReport}
              className="border-none bg-white text-base cursor-pointer py-2 px-3 text-black font-bold rounded-lg"
            >
              Relatório
            </button>
          </div>
        </div>
        <div className="flex py-16 px-3 items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {exit ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => handleToConfirm()}
                  className="text-lg bg-red text-gray border-none py-1 px-3 rounded-md font-bold cursor-pointer hover:bg-gray hover:text-red"
                >
                  Sair
                </button>
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
