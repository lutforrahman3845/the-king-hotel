import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
const OurLocation = () => {
  const position = [23.7425, 90.4071];
  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] px-2 overflow-hidden my-6 md:my-10">
      <h1 className="text-xl  lg:text-2xl  xl:text-3xl text-center font-cinzel font-semibold mb-4">
        Our Location
      </h1>

      <div className="w-full h-full border rounded-lg">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default OurLocation;
