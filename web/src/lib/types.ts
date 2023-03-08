export interface User {
  id: string;
  token: string;
  name: string;
  email: string;
  image: string;
  decorations?: Decoration[];
  favourites?: string[];
  createdAt: string;
}

export interface Decoration {
  id: string;
  name: string;
  address: string;
  images: string[] | undefined;
  verified: boolean;
  rating: number;
  numRatings: number;
  views: number;
  latitude: number;
  longitude: number;
  country: string | undefined;
  city: string | undefined;
  createdAt: string;
  updatedAt: string;
  year: string;
  userId: string;
  hideRatings: boolean;
  hideViews: boolean;
}

export interface DecorationImage {
  id: string;
  image: string;
  preview: string;
  alt: string;
}

export interface GeocoderAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface createDecorationInput {
  name: string;
  address: string;
  images: string[];
  latitude: number;
  longitude: number;
  country: string | undefined;
  city: string | undefined;
  userId: string | undefined;
  hideRatings: boolean;
  hideViews: boolean;
}
