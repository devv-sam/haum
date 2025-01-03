import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

function Map({ items }) {
  const mapRef = useRef(); // Create a reference to the map

  useEffect(() => {
    if (mapRef.current) {
      const mapInstance = mapRef.current;

      // Add geocoder control
      L.Control.geocoder({
        defaultMarkGeocode: false, // Prevents adding default markers
      })
        .on("markgeocode", (event) => {
          const { lat, lng } = event.geocode.center;
          mapInstance.setView([lat, lng], 13); // Center map at geocoded location
        })
        .addTo(mapInstance);
    }
  }, []);

  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude]
          : [51.505, -0.09]
      }
      zoom={7}
      scrollWheelZoom={false}
      className="map"
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
