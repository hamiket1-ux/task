import type { Coordinates } from "../types/place";

const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const calculateDistance = (
  point1: Coordinates,
  point2: Coordinates
): number => {
  const latitudeDifference = toRadians(
    point2.latitude - point1.latitude
  );

  const longitudeDifference = toRadians(
    point2.longitude - point1.longitude
  );

  const latitude1 = toRadians(point1.latitude);
  const latitude2 = toRadians(point2.latitude);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(longitudeDifference / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
};