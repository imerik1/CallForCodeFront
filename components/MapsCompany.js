import "leaflet/dist/leaflet.css";

import { useState } from "react";

import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

export const Map = ({ latitude, longitude, nome, zoom, companies }) => {
  const [useSelect, setSelect] = useState(false);
  const [useName, setName] = useState(false);
  const iconCompanies = L.icon({ iconUrl: "/marker.png", iconSize: [30, 30] });
  const iconHome = L.icon({ iconUrl: "/marker_home.png", iconSize: [30, 30] });
  const handleClickMarker = (e) => {
    const value = e.target.options.documento;
    const nome = e.target.options.nome;
    setName(nome);
    setSelect(value);
    sessionStorage.setItem("nome-marker", useName);
    sessionStorage.setItem("documento-marker", useSelect);
  };
  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: 400, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          data={"Sua Casa"}
          eventHandlers={{
            click: (e) => {
              handleClickMarker(e);
            },
          }}
          icon={iconHome}
          position={[latitude, longitude]}
        >
          <Popup>Seu lugar</Popup>
        </Marker>
        {companies[0].map((company, index) => {
          return (
            <Marker
              key={index}
              documento={company.documento}
              nome={company.nomeEmpresa}
              eventHandlers={{
                click: (e) => {
                  handleClickMarker(e);
                },
              }}
              icon={iconCompanies}
              position={[company.address.latitude, company.address.longitude]}
            >
              <Popup>{company.nomeEmpresa}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};
