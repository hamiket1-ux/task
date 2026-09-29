import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import type {
  Coordinates,
  Place,
} from "../../types/place";
import MapController from "./MapController";

interface LocationMapProps {
  location: Coordinates;
  places: Place[];
  onPlaceSelect: (place: Place) => void;
}

const placeIcon = L.divIcon({
  className: "place-marker",
  html: `
    <div class="place-marker__pin">
      <div class="place-marker__dot"></div>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
});

const LocationMap = ({
  location,
  places,
  onPlaceSelect,
}: LocationMapProps) => {
  const center: [number, number] = [
    location.latitude,
    location.longitude,
  ];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom
      zoomControl
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController location={location} />

      {/* 5 KM RADIUS */}
      <Circle
        center={center}
        radius={5000}
        pathOptions={{
          color: "#4b7bec",
          fillColor: "#6c7ff2",
          fillOpacity: 0.22,
          weight: 2,
        }}
      />

      {/* USER LOCATION */}
      <CircleMarker
        center={center}
        radius={8}
        pathOptions={{
          color: "#ffffff",
          weight: 3,
          fillColor: "#f5a623",
          fillOpacity: 1,
        }}
      >
        <Popup>موقعیت فعلی شما</Popup>
      </CircleMarker>

      {/* PLACES */}
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[
            place.latitude,
            place.longitude,
          ]}
          icon={placeIcon}
          eventHandlers={{
            click: () => onPlaceSelect(place),
          }}
        >
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LocationMap;