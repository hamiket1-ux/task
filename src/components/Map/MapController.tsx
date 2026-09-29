import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { Coordinates } from "../../types/place";

interface MapControllerProps {
  location: Coordinates;
}

const MapController = ({ location }: MapControllerProps) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(
      [location.latitude, location.longitude],
      13,
      {
        duration: 1.5,
      }
    );
  }, [location, map]);

  return null;
};

export default MapController;