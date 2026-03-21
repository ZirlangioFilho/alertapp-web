import { useMemo } from "react";
import ButtonConfirm from "../ButtonConfirm";
import ReportMap from "../ReportMap";
import { type ReportItem } from "../../services/reportService";
import mapMarkerSvgUrl from "../../assets/map.svg?url";

type PopUpProps = {
  report: ReportItem;
  onClose: () => void;
};

function formatStoppedAt(d: Date | null | undefined): string {
  if (!d) return "";
  return d.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

const SOS_CATEGORY = "Violência doméstica" as const;

export default function PopUp({ report, onClose }: PopUpProps) {
  const isSosDomesticViolence = report.category === SOS_CATEGORY;
  const hasCoords = report.latitude != null && report.longitude != null;
  /** Mapa e Maps: qualquer categoria com coordenadas (relato = envio único; SOS = pode estar ao vivo). */
  const hasLocation = hasCoords;
  /** Só SOS com rastreio periódico ativo. */
  const isLiveTracking = isSosDomesticViolence && report.locationUpdatesActive === true;
  const stoppedSending =
    isSosDomesticViolence &&
    hasCoords &&
    !isLiveTracking &&
    report.locationStoppedAt != null;

  const handleOpenInGoogleMaps = () => {
    if (hasLocation) {
      const url = `https://www.google.com/maps?q=${report.latitude},${report.longitude}`;
      window.open(url, "_blank");
    } else {
      alert("Este relato não possui coordenadas de localização.");
    }
  };

  const mapLabel = useMemo(
    () => `${report.name}${report.address ? ` – ${report.address}` : ""}`,
    [report.name, report.address]
  );

  return (
    <div
      className="fixed inset-0 z-50 w-full h-full bg-black/45 backdrop-blur-[1px] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative my-auto p-0 bg-white rounded-2xl border border-[#d6deea] shadow-[0_18px_45px_rgba(15,23,42,0.2)] max-w-[640px] w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col gap-0">
          <div className="w-full p-5 md:p-6 bg-linear-to-r from-[#1e4ecb] to-[#315fd8] text-white">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg md:text-xl font-semibold wrap-break-word">
                {report.name}
              </h2>
              {isLiveTracking && (
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-100"
                  title="Atualização em tempo real ativa"
                >
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-300 animate-pulse" />
                  <span>Enviando localização</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-5 md:p-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#e0e6f0] bg-[#f8fafc] px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-[#697589]">Categoria</p>
                <p className="text-sm md:text-base text-[#1f2937] font-medium wrap-break-word">{report.category}</p>
              </div>
              <div className="rounded-xl border border-[#e0e6f0] bg-[#f8fafc] px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-[#697589]">Endereço</p>
                <p className="text-sm md:text-base text-[#1f2937] font-medium wrap-break-word">{report.address || "—"}</p>
              </div>
            </div>

            <div className="rounded-xl border border-[#e0e6f0] bg-[#f8fafc] px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-[#697589]">Relato</p>
              <p className="text-sm md:text-base text-[#1f2937] wrap-break-word whitespace-pre-wrap">{report.report}</p>
            </div>

          {hasLocation && (
            <>
              {stoppedSending && (
                <div
                  className="rounded-xl bg-amber-100 border border-amber-300 px-3 py-2 text-amber-900"
                  role="alert"
                >
                  <p className="font-semibold text-sm">Usuário parou de enviar localização</p>
                  <p className="text-xs mt-0.5">
                    {report.locationStoppedAt
                      ? `Última atualização: ${formatStoppedAt(report.locationStoppedAt)}. `
                      : ""}
                    Exibindo última localização conhecida.
                  </p>
                </div>
              )}
              <ReportMap
                latitude={report.latitude!}
                longitude={report.longitude!}
                label={mapLabel}
                className="w-full"
                markerIconUrl={mapMarkerSvgUrl}
                markerIconSize={[36, 36]}
                markerIconAnchor={[18, 36]}
                markerWithShadow={false}
              />
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end w-full">
            {hasLocation && (
              <ButtonConfirm text="Abrir no Google Maps" onPress={handleOpenInGoogleMaps} />
            )}
            <ButtonConfirm text="Fechar" onPress={onClose} />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
