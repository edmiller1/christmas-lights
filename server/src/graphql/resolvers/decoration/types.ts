export interface createDecorationArgs {
  input: {
    name: string;
    address: string;
    images?: string[];
    latitude: number;
    longitude: number;
    country: string;
    city: string;
    userId: string;
    hideRatings: boolean;
    hideViews: boolean;
  };
}

export interface DecorationArgs {
  _id: string;
}
