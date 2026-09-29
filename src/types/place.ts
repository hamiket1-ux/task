export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Place extends Coordinates {
  id: number;
  name: string;
  description: string;
  address: string;
}