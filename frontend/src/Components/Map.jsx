import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported
import img from "../assets/BasicIcon/location.png";

const customIcon = new Icon({
  iconUrl: img, // Provide the path to your custom icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = ({ latAndLong, zoom }) => {
  const mapKey = latAndLong ? `${latAndLong[0]}-${latAndLong[1]}` : "default";

  const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const position = [17.2865, 74.1979];

  return (
    <MapContainer
      key={mapKey}
      center={latAndLong.length !== 0 ? latAndLong : position}
      zoom={zoom ? zoom : 4}
      scrollWheelZoom={false}
      className="w-full rounded-lg h-full "
    >
      <TileLayer url={url} attribution={attribution} />
      <Marker
        position={latAndLong.length !== 0 ? latAndLong : position}
        icon={customIcon}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
