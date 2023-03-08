export interface CreateDecoration_CreateDecoration {
  __typename: "Decoration";
  id: string;
}

export interface CreateDecoration {
  createDecoration: CreateDecoration_CreateDecoration;
}

export interface CreateDecorationInput {
  name: string;
  address: string;
  images: string[];
  latitude: number;
  longitude: number;
  country: string | undefined;
  city: string | undefined;
  hideRatings: boolean;
  hideViews: boolean;
  userId: string | undefined;
}

export interface CreateDecorationVariables {
  input: CreateDecorationInput;
}
