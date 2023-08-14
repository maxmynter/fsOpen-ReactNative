import { gql } from "@apollo/client";
import { REPOSITORY_DETAILS_FRAGMENT } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_DETAILS_FRAGMENT}
  query Query($searchKeyword: String) {
    repositories(searchKeyword: $searchKeyword) {
      edges {
        node {
          ...repositoryDetailFragment
        }
      }
    }
  }
`;

export const GET_REPOSITORY_DETAIL = gql`
  ${REPOSITORY_DETAILS_FRAGMENT}
  query Repositories($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...repositoryDetailFragment
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

export const GET_REPOSITORY_REVIEWS = gql`
  query reviews($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
