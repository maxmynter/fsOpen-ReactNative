import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Query {
    repositories {
      edges {
        node {
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
          description
          fullName
          forksCount
          language
        }
      }
    }
  }
`;

// Gets information about logged in user. Returns null if not logged in
export const GET_LOGGED_IN_USER = gql`
  {
    me {
      id
      username
    }
  }
`;
