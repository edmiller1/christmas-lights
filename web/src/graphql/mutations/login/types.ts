export interface LogIn_LogIn {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface LogIn {
  logIn: LogIn_LogIn;
}

export interface LogInInput {
  uid: string;
  accessToken: string;
  isNewUser: boolean;
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
  createdAt: string;
}

export interface LogInVariables {
  input: { result: LogInInput };
}
