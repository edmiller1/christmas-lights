export interface Decoration_decoration {
  __typename: "Decoration";
  id: string;
  name: string;
  address: string;
  images: string[];
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

export interface Decoration {
  decoration: Decoration_decoration;
}

export interface DecorationVariables {
  id: string | undefined;
}
