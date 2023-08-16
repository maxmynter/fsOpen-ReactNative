import { GET_REPOSITORY_REVIEWS } from "../graphQL/queries";
import generateGraphQLHook from "../utils/fetchGraphQLHook";

const useRepositoryReviews = (queryVariables) => {
  const { resource, loading, refetch, fetchMore } = generateGraphQLHook({
    graphQLQuery: GET_REPOSITORY_REVIEWS,
    queryVariables,
  });

  const handleFetchMore = async (queryVariables) => {
    const canFetchMore =
      !loading && resource?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: resource.repository.reviews.pageInfo.endCursor,
        ...queryVariables,
      },
    });
  };

  const ReturnValueFornoDataAvailable = { edges: [] };
  return {
    repositoryReviews:
      resource !== null && resource.repository != null
        ? resource.repository.reviews.edges
        : ReturnValueFornoDataAvailable,
    loading,
    refetch,
    fetchMore: handleFetchMore,
  };
};
export default useRepositoryReviews;
