import Logo from '../../assets/logo.svg'

type SearchProps = {
  report: string;
  reportChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchReport({ report, reportChange, placeholder }: SearchProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-primary py-5 px-4 md:px-8 shrink-0">
      <div className="hidden md:flex justify-center items-center">
        <img src={Logo} alt="Logo AlertApp" className="w-[110px] h-auto" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 min-w-0 w-full md:max-w-[820px]">
        <div className="flex items-center bg-white rounded-xl border border-[#d7dce5] px-3 w-full shadow-sm">
          <span className="text-[#7e8aa0] mr-2">🔍</span>
          <input
            type="text"
            placeholder={placeholder ?? "Busca (texto, dia ou data DD/MM/AAAA)"}
            value={report}
            className="flex-1 min-w-0 py-3 px-0 text-sm md:text-base bg-transparent outline-none"
            onChange={(e) => reportChange(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-[#1e4ecb] rounded-xl py-3 px-6 border-none text-white font-semibold cursor-pointer whitespace-nowrap"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
