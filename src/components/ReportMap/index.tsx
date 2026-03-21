import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Corrige ícone do marcador com Vite (evita imagem quebrada)
import markerIcon from "leaflet/dist/images/marker-icon.png?url";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png?url";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png?url";
L.Icon.Default.mergeOptions({ iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadowPng });
const defaultIcon = new L.Icon.Default();

type ReportMapProps = {
  latitude: number;
  longitude: number;
  label?: string;
  className?: string;
  /** URL do ícone do marcador (PNG ou SVG). Se omitido, usa o marcador padrão do Leaflet. */
  markerIconUrl?: string;
  markerIconSize?: [number, number];
  markerIconAnchor?: [number, number];
  /** SVG costuma ficar melhor sem a sombra padrão do Leaflet */
  markerWithShadow?: boolean;
};

export default function ReportMap({
  latitude,
  longitude,
  label,
  className = "",
  markerIconUrl,
  markerIconSize = [36, 36],
  markerIconAnchor = [18, 36],
  markerWithShadow = true,
}: ReportMapProps) {
  const position: [number, number] = useMemo(() => [latitude, longitude], [latitude, longitude]);

  const leafletMarkerIcon = useMemo(() => {
    if (!markerIconUrl) return defaultIcon;
    const popupY = -Math.max(8, markerIconAnchor[1] - 4);
    if (!markerWithShadow) {
      return new L.Icon({
        iconUrl: markerIconUrl,
        iconSize: markerIconSize,
        iconAnchor: markerIconAnchor,
        popupAnchor: [0, popupY],
      });
    }
    return new L.Icon({
      iconUrl: markerIconUrl,
      iconRetinaUrl: markerIconUrl,
      shadowUrl: markerShadowPng,
      iconSize: markerIconSize,
      shadowSize: [41, 41],
      iconAnchor: markerIconAnchor,
      shadowAnchor: [12, 41],
      popupAnchor: [1, popupY],
    });
  }, [markerIconUrl, markerIconSize, markerIconAnchor, markerWithShadow]);

  return (
    <div className={`rounded-lg overflow-hidden border border-[var(--color-dark-gray)] ${className}`}>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="h-[240px] w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={leafletMarkerIcon} key={markerIconUrl ?? "default"}>
          {label && <Popup>{label}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
