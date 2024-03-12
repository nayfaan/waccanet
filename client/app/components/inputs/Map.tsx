import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import L, { LatLngTuple, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";

interface MapProps {
  houseAddress: string;
  center: LatLngTuple;
  onChange?: (id: string, value: string | LatLngTuple) => void;
}

const Map: React.FC<MapProps> = ({
  houseAddress,
  center,
  onChange = () => {},
}) => {
  const handleMapClick = async (event: LeafletMouseEvent) => {
    const address = await fetchAddress(event.latlng.lat, event.latlng.lng);
    if (onChange) {
      onChange("houseAddress", address);
      onChange("center", [event.latlng.lat, event.latlng.lng]);
    }
  };

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  };

  const customIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <FaMapMarkerAlt style={{ color: "red", fontSize: "28px" }} />
    ),
    className: "leaflet-custom-icon",
  });

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onMapClick={handleMapClick} />
      {houseAddress && (
        <>
          <Marker position={center} icon={customIcon} />
          {/* {houseAddress && <Popup position={center}>{houseAddress}</Popup>} */}
        </>
      )}
    </MapContainer>
  );
};

interface ClickHandlerProps {
  onMapClick: (event: LeafletMouseEvent) => void;
}

const ClickHandler: React.FC<ClickHandlerProps> = ({ onMapClick }) => {
  const map = useMap();

  useEffect(() => {
    const handleClick = (event: LeafletMouseEvent) => {
      onMapClick(event);
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [map, onMapClick]);

  return null;
};

export default Map;
