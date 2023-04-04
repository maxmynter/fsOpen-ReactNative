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
