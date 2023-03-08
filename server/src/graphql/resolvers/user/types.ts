import { FirebaseAuthResult } from "../../../lib/types";

export interface LogInArgs {
  input: { result: FirebaseAuthResult };
}

export interface UserArgs {
  _id: string;
}
