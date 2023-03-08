import { Decoration } from "../../../lib/types";

export interface User_user {
  __typename: "User";
  id: string;
  token: string;
  name: string;
  email: string;
  image: string;
  decorations?: Decoration[];
  favourites?: string[];
  createdAt: string;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  id: string | null | undefined;
}
