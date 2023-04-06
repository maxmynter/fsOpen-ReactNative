import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS_FRAGMENT = gql`
  fragment repositoryDetailFragment on Repository {
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    description
    fullName
    forksCount
    language
    id
    url
  }
`;
