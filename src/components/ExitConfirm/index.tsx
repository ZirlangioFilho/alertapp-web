type ExitProps = {
  exit: () => void;
  noExit: () => void;
}

export default function ExitConfirm({ exit, noExit }: ExitProps) {
  return (
    <div className="w-full bg-[#1c2c47] rounded-xl p-3 border border-white/10 gap-3 flex flex-col items-center">
      <p className="text-sm md:text-base text-white font-bold text-center">Tem certeza?</p>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={exit}
          className="text-white bg-red-500 text-sm md:text-base font-bold rounded-lg border-none py-1 px-3 cursor-pointer"
        >
          Sim
        </button>
        <button
          type="button"
          onClick={noExit}
          className="text-white bg-primary text-sm md:text-base font-bold rounded-lg border-none py-1 px-3 cursor-pointer"
        >
          Não
        </button>
      </div>
    </div>
  );
}
