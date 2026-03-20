import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Corrige ícone do marcador com Vite (evita imagem quebrada)
import markerIcon from "leaflet/dist/images/marker-icon.png?url";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png?url";
import markerShadow from "leaflet/dist/images/marker-shadow.png?url";
L.Icon.Default.mergeOptions({ iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow });
const defaultIcon = new L.Icon.Default();

type ReportMapProps = {
  latitude: number;
  longitude: number;
  label?: string;
  className?: string;
};

export default function ReportMap({ latitude, longitude, label, className = "" }: ReportMapProps) {
  const position: [number, number] = useMemo(() => [latitude, longitude], [latitude, longitude]);

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
        <Marker position={position} icon={defaultIcon}>
          {label && <Popup>{label}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
