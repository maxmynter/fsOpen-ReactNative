import { gql } from "@apollo/client";
import { REPOSITORY_DETAILS_FRAGMENT } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_DETAILS_FRAGMENT}
  query Query($searchKeyword: String, $first: Int = 8, $after: String) {
    repositories(searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
          ...repositoryDetailFragment
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
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
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt
            rating
            repository {
              id
              fullName
              name
            }
            text
            id
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_REVIEWS = gql`
  query reviews($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $first, after: $after) {
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
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
