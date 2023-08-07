import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation authenticate($authenticateCredentials2: AuthenticateInput) {
    authenticate(credentials: $authenticateCredentials2) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;
