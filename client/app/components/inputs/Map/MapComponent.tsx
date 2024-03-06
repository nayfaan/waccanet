import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import L, { LatLngTuple, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";

const MapComponent: React.FC = () => {
  const center: LatLngTuple = [49.246292, -123.116226];
  const [clickedPosition, setClickedPosition] = useState<LatLngTuple | null>(
    null
  );
  const [clickedAddress, setClickedAddress] = useState<string | null>(null);

  const handleMapClick = async (event: LeafletMouseEvent) => {
    setClickedPosition([event.latlng.lat, event.latlng.lng]);
    const address = await fetchAddress(event.latlng.lat, event.latlng.lng);
    setClickedAddress(address);
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

  useEffect(() => {
    console.log("clickedAddress", clickedAddress);
  }, [clickedAddress]);

  useEffect(() => {
    console.log("clickedPosition", clickedPosition);
  }, [clickedPosition]);

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
      {clickedPosition && (
        <Marker position={clickedPosition} icon={customIcon}>
          {clickedAddress && <Popup>{clickedAddress}</Popup>}
        </Marker>
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
    map.on("click", onMapClick);
    return () => {
      map.off("click", onMapClick);
    };
  }, [map, onMapClick]);

  return null;
};

export default MapComponent;
