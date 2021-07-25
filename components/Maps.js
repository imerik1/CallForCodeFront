import "leaflet/dist/leaflet.css";

import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

export const Map = ({ latitude, longitude, nome, zoom }) => {
  const icon = L.icon({ iconUrl: "/marker.png", iconSize: [30, 30] });
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={40}
      scrollWheelZoom={zoom}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={icon} position={[latitude, longitude]}>
        <Popup>Seu lugar {nome ? nome : ""}</Popup>
      </Marker>
    </MapContainer>
  );
};
