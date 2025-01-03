import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

function Map({ items }) {
  const MapView = ({ center }) => {
    const map = useMap();
    map.setView(center, 13); // Adjust zoom level if needed
    return null;
  };

  const center =
    items.length === 1
      ? [items[0].latitude, items[0].longitude]
      : [51.505, -0.09]; // Default center if no items

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={true}
      className="map w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.length === 1 && <MapView center={center} />}
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
