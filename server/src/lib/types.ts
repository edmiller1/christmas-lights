import { Collection, ObjectId } from "mongodb";

export interface User {
  _id: string;
  token: string;
  name: string;
  email: string;
  image: string;
  decorations: ObjectId[];
  favourites: ObjectId[];
  createdAt: string;
}

export interface Decoration {
  _id: ObjectId;
  name: string;
  address: string;
  images?: string[];
  verified: boolean;
  rating: number;
  numRatings: number;
  views: number;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  year: string;
  userId: string;
  hideRatings: boolean;
  hideViews: boolean;
}

export interface FirebaseAuthResult {
  uid: string;
  accessToken: string;
  isNewUser: boolean;
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
  createdAt: string;
}

export interface Database {
  users: Collection<User>;
  decorations: Collection<Decoration>;
}
