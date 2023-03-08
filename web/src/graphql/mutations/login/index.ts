import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation logIn($input: LogInInput) {
    logIn(input: $input) {
      id
      name
      email
      image
    }
  }
`;
