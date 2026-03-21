import { useState, useEffect } from "react";
import { type ButtonType } from "../../constants/buttons";
import { useRelativeTimeLabel } from "../../hooks/useRelativeTimeLabel";

type BlockVictimProps = {
  onClick: () => void;
  name: string;
  category: ButtonType;
  report: string;
  address: string;
  createdAt?: Date | null;
};

export const BlockVictimReport = ({ onClick, name, report, address, createdAt }: BlockVictimProps) => {
  const timeLabel = useRelativeTimeLabel(createdAt);
  const [check, setCheck] = useState(false);

  const getKey = () => `visto-${name}-${report}-${address}`;

  useEffect(() => {
    const stored = localStorage.getItem(getKey());
    if (stored) setCheck(JSON.parse(stored));
  }, [name, report, address]);

  const switchCheck = () => {
    const newCheck = !check;
    setCheck(newCheck);
    localStorage.setItem(getKey(), JSON.stringify(newCheck));
  };

  return (
    <div
      className={`w-full max-w-[1080px] flex flex-col md:flex-row border border-[#dce1ea] py-3 px-4 items-stretch md:items-center rounded-xl gap-3 md:text-left text-center min-w-0 bg-white shadow-sm`}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full md:w-[88%] border-none flex flex-col md:flex-row gap-3 md:gap-4 cursor-pointer bg-transparent text-left min-w-0 items-start md:items-center"
      >
        <div className="flex items-center gap-3 min-w-[180px]">
          <div className="w-8 h-8 rounded-full bg-[#2f6f76] text-white flex items-center justify-center font-bold">i</div>
          <div>
            <p className="text-[#161a23] font-semibold leading-tight">{name}</p>
            <p className="text-xs text-[#7b8294]" title={createdAt ? createdAt.toLocaleString("pt-BR") : undefined}>
              {timeLabel}
            </p>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wide text-[#8d94a3]">Relato do incidente</p>
          <p className="text-sm text-[#343b4a] truncate">"{report}"</p>
          <p className="text-[11px] uppercase tracking-wide text-[#8d94a3] mt-2">Endereço de ocorrência</p>
          <p className="text-xs text-[#596073] truncate">{address}</p>
        </div>
      </button>
      <div className="flex md:flex-col gap-2 shrink-0 self-center md:self-auto">
        <button type="button" className="border-none py-2 px-4 text-white rounded-lg font-semibold text-xs bg-[#2f6f76]">
          Abrir
        </button>
        <button
          type="button"
          onClick={switchCheck}
          className={`border-none py-2 px-4 text-white rounded-lg font-semibold text-xs ${
            check ? "bg-[#8f9aad]" : "bg-[#38a356]"
          }`}
        >
          {check ? "Marcado" : "Concluir"}
        </button>
      </div>
    </div>
  );
};
