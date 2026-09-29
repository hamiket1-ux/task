import { useEffect, useState } from "react";
import type { Coordinates } from "../types/place";

interface GeolocationState {
  location: Coordinates | null;
  loading: boolean;
  error: string | null;
}

const GEOLOCATION_ERROR = "دسترسی به موقعیت مکانی امکان‌پذیر نیست.";

export const useGeolocation = (): GeolocationState => {
  const [location, setLocation] = useState<Coordinates | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const isGeolocationSupported =
    typeof navigator !== "undefined" && "geolocation" in navigator;

  useEffect(() => {
    if (!isGeolocationSupported) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLoading(false);
      },
      () => {
        setError(GEOLOCATION_ERROR);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, [isGeolocationSupported]);

  if (!isGeolocationSupported) {
    return {
      location: null,
      loading: false,
      error: "مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.",
    };
  }

  return {
    location,
    loading,
    error,
  };
};
