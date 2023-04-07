import { GET_REPOSITORY_REVIEWS } from "../graphQL/queries";
import generateGraphQLHook from "../utils/fetchGraphQLHook";

const useRepositoryReviews = ({ repoID }) => {
  const { resource, loading, refetch } = generateGraphQLHook({
    graphQLQuery: GET_REPOSITORY_REVIEWS,
    queryVariables: { repositoryId: repoID },
  });
  const ReturnValueFornoDataAvailable = { edges: [] };
  return {
    repositoryReviews:
      resource != null
        ? resource.repository.reviews.edges
        : ReturnValueFornoDataAvailable,
    loading,
    refetch,
  };
};
export default useRepositoryReviews;
