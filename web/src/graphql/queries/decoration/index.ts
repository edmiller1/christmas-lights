import { gql } from "@apollo/client";

export const DECORATION = gql`
  query Decoration($id: String!) {
    decoration(id: $id) {
      id
      name
      address
      images
      verified
      rating
      numRatings
      views
      latitude
      longitude
      country
      city
      createdAt
      updatedAt
      year
      userId
      hideRatings
      hideViews
    }
  }
`;
