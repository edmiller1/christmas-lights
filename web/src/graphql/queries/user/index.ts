import { gql } from "@apollo/client";

export const USER = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      name
      email
      image
      decorations
      favourites
      createdAt
    }
  }
`;
