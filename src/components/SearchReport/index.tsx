import Logo from '../../assets/logo.svg'

type SearchProps = {
  report: string;
  reportChange: (value: string) => void;
}

export default function SearchReport({ report, reportChange }: SearchProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-primary py-3 px-3 flex-shrink-0">
      <div className="flex justify-center items-center">
        <img src={Logo} alt="Logo AlertApp" className="w-20 sm:w-[100px] h-auto" />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 min-w-0">
        <input
          type="text"
          placeholder="Pesquisar relato..."
          value={report}
          className="flex-1 min-w-0 py-2 sm:py-3 px-3 sm:px-[18px] rounded-lg border border-dark-gray text-base"
          onChange={(e) => reportChange(e.target.value)}
        />
        <button
          type="button"
          className="bg-gray rounded-lg py-2 sm:py-1 px-3 sm:px-2 border-none text-primary font-bold cursor-pointer hover:bg-dark-gray whitespace-nowrap"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
