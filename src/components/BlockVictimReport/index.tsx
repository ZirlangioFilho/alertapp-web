import { type ButtonType } from "../../constants/buttons";
import { useRelativeTimeLabel } from "../../hooks/useRelativeTimeLabel";

type BlockVictimReportProps = {
  onClick: () => void;
  name: string;
  category: ButtonType;
  report: string;
  address: string;
  createdAt?: Date | null;
  concludedAt?: Date | null;
  concludedByOfficerName?: string | null;
};

function formatConcludedAt(d: Date): string {
  return d.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export const BlockVictimReport = ({
  onClick,
  name,
  category,
  report,
  address,
  createdAt,
  concludedAt,
  concludedByOfficerName,
}: BlockVictimReportProps) => {
  const timeLabel = useRelativeTimeLabel(createdAt);

  return (
    <div
      className="flex w-full max-w-[1080px] flex-col rounded-xl border border-[#dce1ea] bg-white px-4 py-3 text-center shadow-sm min-w-0 md:flex-row md:items-center md:text-left"
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full min-w-0 cursor-pointer flex-col gap-3 border-none bg-transparent text-left md:flex-row md:gap-4"
      >
        <div className="flex min-w-[180px] items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2f6f76] text-sm font-bold text-white">
            i
          </div>
          <div>
            <p className="leading-tight font-semibold text-[#161a23]">{name}</p>
            <p
              className="text-xs text-[#7b8294]"
              title={createdAt ? createdAt.toLocaleString("pt-BR") : undefined}
            >
              {timeLabel}
            </p>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wide text-[#8d94a3]">Categoria</p>
          <p className="truncate text-sm text-[#343b4a]">{category}</p>
          <p className="mt-2 text-[11px] uppercase tracking-wide text-[#8d94a3]">
            Relato do incidente
          </p>
          <p className="truncate text-sm text-[#343b4a]">&quot;{report}&quot;</p>
          <p className="mt-2 text-[11px] uppercase tracking-wide text-[#8d94a3]">
            Endereço de ocorrência
          </p>
          <p className="truncate text-xs text-[#596073]">{address}</p>
        </div>
          {concludedAt ? (
            <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-left flex flex-col items-center justify-center">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                Ocorrência concluída
              </p>
              <p className="text-sm font-semibold text-emerald-900" title={concludedAt.toISOString()}>
                {formatConcludedAt(concludedAt)}
              </p>
              {concludedByOfficerName ? (
                <p className="mt-1.5 text-xs text-emerald-800">
                  <span className="font-medium text-emerald-900/90">Por: </span>
                  {concludedByOfficerName}
                </p>
              ) : null}
            </div>
          ) : null}
      </button>
    </div>
  );
};
