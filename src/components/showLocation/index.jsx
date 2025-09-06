import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const ShowLocation = ({ lat, lng, markerIconUrl }) => {
  const customMarkerIcon = new L.Icon({
    iconUrl: markerIconUrl, // The image URL passed as prop
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      <Marker position={[lat, lng]} icon={customMarkerIcon}>
        <Popup>
          Latitude: {lat.toFixed(6)}, Longitude: {lng.toFixed(6)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default ShowLocation;
