import type { Place } from "../types/place";

interface MockPlace extends Omit<Place, "latitude" | "longitude"> {
  offsetLat: number;
  offsetLng: number;
}

export const mockPlaces: MockPlace[] = [
  {
    id: 1,
    name: "کافه روبرو",
    description: "یک کافه دنج با فضای آرام",
    address: "خیابان اصلی، پلاک ۱۲",
    offsetLat: 0.012,
    offsetLng: 0.008,
  },
  {
    id: 2,
    name: "رستوران سنتی",
    description: "رستوران با غذاهای ایرانی",
    address: "خیابان ولیعصر، پلاک ۲۵",
    offsetLat: -0.018,
    offsetLng: 0.012,
  },
  {
    id: 3,
    name: "پارک شهر",
    description: "فضای سبز مناسب پیاده‌روی",
    address: "بلوار مرکزی",
    offsetLat: 0.025,
    offsetLng: -0.02,
  },
  {
    id: 4,
    name: "کتابفروشی مرکزی",
    description: "فروش انواع کتاب‌های فارسی و انگلیسی",
    address: "میدان مرکزی، پلاک ۸",
    offsetLat: -0.032,
    offsetLng: -0.015,
  },
  {
    id: 5,
    name: "فروشگاه دیجیتال",
    description: "فروش لوازم الکترونیکی",
    address: "خیابان انقلاب، پلاک ۴۵",
    offsetLat: 0.042,
    offsetLng: 0.018,
  },
  {
    id: 6,
    name: "مکان خارج از محدوده",
    description: "این مکان نباید در محدوده نمایش داده شود",
    address: "خیابان دوردست",
    offsetLat: 0.09,
    offsetLng: 0.08,
  },
];

export const createMockPlaces = (
  latitude: number,
  longitude: number
): Place[] => {
  return mockPlaces.map(({ offsetLat, offsetLng, ...place }) => ({
    ...place,
    latitude: latitude + offsetLat,
    longitude: longitude + offsetLng,
  }));
};