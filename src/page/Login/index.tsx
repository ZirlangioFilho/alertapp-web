import BlockLogin from "../../components/BlockLogin";

import LogoDark from '../../assets/logo-dark.svg';
import Background from '../../assets/fundo-login.svg';

export default function Login() {
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
      <div className="hidden md:flex w-max self-start h-[80%] mt-6 ml-10 flex-col justify-between items-start shrink-0">
        <img src={LogoDark} alt="Logo AlertApp" className="w-[150px]" />
        <div className="text-left">
          <h2 className="text-xl text-white cursor-default font-semibold">Painel de monitoramento de ocorrências</h2>
          <h2 className="text-xl text-white/90 cursor-default">Assistência rápida e tomada de decisão</h2>
        </div>
      </div>

      {/* Formulário */}
      <div className="relative z-10 w-full md:w-[22%] md:min-w-[360px] max-w-md md:max-w-none md:mr-16 mx-auto bg-white/95 backdrop-blur-sm flex min-h-[80vh] md:min-h-0 md:h-screen flex-col items-center justify-center py-8 md:py-0 px-6 md:px-12 shrink-0 border-l border-white/30">
        <img src={LogoDark} alt="Logo AlertApp" className="w-24 h-auto md:hidden mb-4" />

      <BlockLogin />

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 bg-gray rounded-lg p-2">
          <p className="text-center text-sm font-light text-gray-500">O cadastro é feito pelo Administrador</p>
        </div>
      </div>
    </section>
  );
}
