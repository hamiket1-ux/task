import { useMemo, useState } from "react";

import {
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import { LocationOn, Storefront, Phone, Navigation } from "@mui/icons-material";

import LocationMap from "./components/Map/LocationMap";
import PlaceCard from "./components/PlaceCard/PlaceCard";
import { useGeolocation } from "./hooks/useGeolocation";
import { createMockPlaces } from "./data/mockPlaces";
import { calculateDistance } from "./utils/distance";
import type { Place } from "./types/place";

const SEARCH_RADIUS_KM = 5;

function App() {
  const { location, loading, error } = useGeolocation();

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const allPlaces = useMemo(() => {
    if (!location) return [];

    return createMockPlaces(location.latitude, location.longitude);
  }, [location]);

  const nearbyPlaces = useMemo(() => {
    if (!location) return [];

    return allPlaces.filter(
      (place) => calculateDistance(location, place) <= SEARCH_RADIUS_KM,
    );
  }, [allPlaces, location]);

  if (loading) {
    return (
      <div className="center-screen">
        <CircularProgress />

        <Typography
          sx={{
            mt: 2,
          }}
        >
          در حال دریافت موقعیت مکانی...
        </Typography>
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="center-screen">
        <Alert severity="error">{error ?? "موقعیت مکانی دریافت نشد."}</Alert>
      </div>
    );
  }

  return (
    <main className="map-page" dir="rtl">
      <LocationMap
        location={location}
        places={nearbyPlaces}
        onPlaceSelect={setSelectedPlace}
      />

      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-icon">
              <Storefront />
            </div>

            <div>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 800,
                }}
              >
                مکان‌یاب
              </Typography>

              <Typography
                sx={{
                  fontSize: 10,
                  color: "text.secondary",
                }}
              >
                مکان‌های اطراف شما
              </Typography>
            </div>
          </div>

          <div className="header-actions">
            <IconButton size="small">
              <LocationOn fontSize="small" />
            </IconButton>

            <IconButton size="small">
              <Phone fontSize="small" />
            </IconButton>

            <IconButton size="small">
              <Navigation fontSize="small" />
            </IconButton>
          </div>
        </div>

        <Divider />

        <div className="sidebar-content">
          <div className="section-title">
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              مکان‌های اطراف
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                color: "text.secondary",
              }}
            >
              {nearbyPlaces.length} مکان در شعاع ۵ کیلومتر
            </Typography>
          </div>

          {selectedPlace ? (
            <PlaceCard
              place={selectedPlace}
              onClose={() => setSelectedPlace(null)}
            />
          ) : (
            <div className="empty-state">
              <LocationOn />

              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                یک مکان را انتخاب کنید
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  color: "text.secondary",
                  textAlign: "center",
                }}
              >
                برای مشاهده اطلاعات، روی یکی از مکان‌های روی نقشه کلیک کنید.
              </Typography>
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}

export default App;
