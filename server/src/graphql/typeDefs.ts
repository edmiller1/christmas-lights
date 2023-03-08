import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: String!
    token: String!
    name: String!
    email: String!
    image: String!
    decorations: [String!]
    favourites: [String]
    createdAt: String!
  }

  type Decoration {
    id: ID!
    name: String!
    address: String!
    images: [String]
    verified: Boolean!
    rating: Float
    numRatings: Int
    views: Int
    latitude: Float!
    longitude: Float!
    country: String!
    city: String!
    createdAt: String!
    updatedAt: String
    year: String!
    userId: String!
    hideRatings: Boolean!
    hideViews: Boolean!
  }

  input FirebaseAuthResult {
    uid: String!
    accessToken: String!
    isNewUser: Boolean!
    displayName: String!
    email: String!
    photoURL: String!
    providerId: String!
    createdAt: String!
  }

  input LogInInput {
    result: FirebaseAuthResult!
  }

  input CreateDecorationInput {
    name: String!
    address: String!
    images: [String]
    latitude: Float!
    longitude: Float!
    country: String!
    city: String!
    userId: String
    hideRatings: Boolean!
    hideViews: Boolean!
  }

  type Query {
    users: [User!]
    user(id: String!): User!
    decoration(id: String!): Decoration!
  }

  type Mutation {
    logIn(input: LogInInput): User!
    createDecoration(input: CreateDecorationInput): Decoration
  }
`;
