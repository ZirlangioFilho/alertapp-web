import { useMemo } from "react";
import ButtonConfirm from "../ButtonConfirm";
import ReportMap from "../ReportMap";
import { type ReportItem } from "../../services/reportService";

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

export default function PopUp({ report, onClose }: PopUpProps) {
  const hasLocation = report.latitude != null && report.longitude != null;
  const stoppedSending = hasLocation && report.locationUpdatesActive === false;

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
      className="fixed inset-0 z-50 w-full h-full bg-black/30 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative my-auto p-4 bg-gray rounded-xl shadow-[0px_5px_10px_var(--color-dark-gray)] max-w-[520px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg md:text-xl font-semibold break-words">
                {report.name}
              </h2>
              <div className="flex items-center gap-1">
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${
                    report.locationUpdatesActive ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
                <span className="text-xs text-gray-700">
                  {report.locationUpdatesActive ? 'Enviando localização' : 'Localização parada'}
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm md:text-base break-words">
              <b>Categoria:</b> {report.category}
            </p>
            <p className="mt-1 text-sm md:text-base break-words">
              <b>Relato:</b> {report.report}
            </p>
            <p className="mt-1 text-sm md:text-base break-words">
              <b>Endereço:</b> {report.address || "—"}
            </p>
          </div>

          {hasLocation && (
            <>
              {stoppedSending && (
                <div
                  className="rounded-lg bg-amber-500/20 border border-amber-600/50 px-3 py-2 text-amber-900"
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
              />
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center w-full">
            {hasLocation && (
              <ButtonConfirm text="Abrir no Google Maps" onPress={handleOpenInGoogleMaps} />
            )}
            <ButtonConfirm text="Fechar" onPress={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
