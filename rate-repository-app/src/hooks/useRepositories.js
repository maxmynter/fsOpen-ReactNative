import { GET_REPOSITORIES } from "../graphQL/queries";
import generateGraphQLHook from "../utils/fetchGraphQLHook";

const useRepositories = (queryVariables) => {
  const { resource, loading, refetch, fetchMore } = generateGraphQLHook({
    graphQLQuery: GET_REPOSITORIES,
    queryVariables,
  });

  const handleFetchMore = (queryVariables) => {
    const canFetchMore =
      !loading && resource?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    console.log(
      "🚀 ~ file: useRepositories.js:27 ~ handleFetchMore ~ queryVariables:",
      queryVariables
    );

    fetchMore({
      variables: {
        after: resource.repositories.pageInfo.endCursor,
        ...queryVariables,
      },
    });
  };
  const ReturnValueFornoDataAvailable = { edges: [] };

  return {
    repositories:
      resource != null ? resource.repositories : ReturnValueFornoDataAvailable,
    loading,
    fetchMore: handleFetchMore,
    refetch,
  };
};

export default useRepositories;
