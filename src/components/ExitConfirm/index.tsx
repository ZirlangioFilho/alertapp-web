type ExitProps = {
  exit: () => void;
  noExit: () => void;
}

export default function ExitConfirm({ exit, noExit }: ExitProps) {
  return (
    <div className="flex p-3 flex-col items-center rounded-lg bg-gray gap-2 max-w-[360px]">
      <p className="text-sm md:text-base text-black font-bold text-center">Tem certeza?</p>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={exit}
          className="text-white bg-red-500 text-sm md:text-base font-bold rounded-lg border-none py-2 px-3 cursor-pointer hover:bg-white hover:text-red transition-colors"
        >
          Sim
        </button>
        <button
          type="button"
          onClick={noExit}
          className="text-white bg-primary text-sm md:text-base font-bold rounded-lg border-none py-2 px-3 cursor-pointer hover:bg-primary hover:text-white transition-colors"
        >
          Não
        </button>
      </div>
    </div>
  );
}
