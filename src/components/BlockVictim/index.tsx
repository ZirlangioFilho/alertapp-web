import { type ButtonType } from "../../constants/buttons";
import { useRelativeTimeLabel } from "../../hooks/useRelativeTimeLabel";

type BlockVictimProps = {
  id: string;
  onClick: () => void;
  onConclude: (id: string) => void;
  name: string;
  category: ButtonType;
  report: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  /** Só usado para SOS (Violência doméstica): badge “Enviando localização”. */
  locationUpdatesActive?: boolean;
  locationStoppedAt?: Date | null;
  /** Data de registro (para “Há X minutos”). */
  createdAt?: Date | null;
};

export const BlockVictim = ({
  id,
  onClick,
  onConclude,
  name,
  category,
  report,
  address,
  latitude,
  longitude,
  locationUpdatesActive,
  locationStoppedAt,
  createdAt,
}: BlockVictimProps) => {
  const timeLabel = useRelativeTimeLabel(createdAt);
  const showSendingBadge =
    category === "Violência doméstica" && locationUpdatesActive === true;
  const showStoppedBadge =
    category === "Violência doméstica" &&
    !showSendingBadge &&
    locationStoppedAt != null;
  const openInMaps = () => {
    const hasCoordinates = latitude != null && longitude != null;
    const mapsUrl = hasCoordinates
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
    window.open(mapsUrl, "_blank");
  };

  const handleConclude = () => {
    const confirmed = window.confirm("Tem certeza?");
    if (!confirmed) return;
    onConclude(id);
  };

  return (
    <div
      className="w-full max-w-[1080px] border border-[#dce1ea] rounded-xl bg-white
        relative px-5 py-3
before:content-[''] 
before:absolute 
before:left-0 
before:top-0 
before:h-full 
before:w-1.5 
before:bg-[#2f6f76]
before:rounded-l-md
        shadow-sm min-w-0"
    >
      <div className="w-full min-w-0 grid grid-cols-1 md:grid-cols-[240px_1fr_170px] gap-4 items-center">
        <button
          type="button"
          onClick={onClick}
          className="border-none bg-transparent cursor-pointer p-0 text-left flex items-center gap-3 min-w-0"
        >
          <div className="w-8 h-8 rounded-full bg-[#2f6f76] text-white flex items-center justify-center font-bold">i</div>
          <div className="min-w-0">
            <p className="text-[#161a23] font-semibold leading-tight truncate">{name}</p>
            <p className="text-xs text-[#7b8294]" title={createdAt ? createdAt.toLocaleString("pt-BR") : undefined}>
              {timeLabel}
            </p>
            {showSendingBadge && (
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[11px] font-semibold text-emerald-700">Enviando localização</span>
              </div>
            )}
            {showStoppedBadge && (
              <p className="mt-1.5 text-[11px] font-medium text-slate-500">Localização parada</p>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={onClick}
          className="border-none bg-transparent cursor-pointer p-0 text-start min-w-0"
        >
          <p className="text-[11px] uppercase tracking-wide text-[#8d94a3]">Relato do incidente</p>
          <p className="text-sm text-[#343b4a] truncate">"{report}"</p>
          <p className="text-[11px] uppercase tracking-wide text-[#8d94a3] mt-2">Endereço de ocorrência</p>
          <p className="text-xs text-[#596073] truncate">{address}</p>
        </button>

        <div className="flex md:flex-col gap-2 shrink-0 self-center md:justify-self-end">
          {category === "Violência doméstica" && (
            <button
              type="button"
              onClick={openInMaps}
              className="border-none py-2 px-4 text-white rounded-lg font-semibold text-xs bg-[#2f6f76]"
            >
              Abrir no Maps
            </button>
          )}
          <button
            type="button"
            onClick={handleConclude}
            className="border-none py-2 px-4 text-white rounded-lg font-semibold text-xs bg-[#38a356]"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
