import { GET_REPOSITORIES } from "../graphQL/queries";
import generateGraphQLHook from "../utils/fetchGraphQLHook";

const useRepositories = () => {
  const { resource, loading, refetch } = generateGraphQLHook({
    graphQLQuery: GET_REPOSITORIES,
    queryVariables: {},
  });
  const ReturnValueFornoDataAvailable = { edges: [] };
  return {
    repositories:
      resource != null ? resource.repositories : ReturnValueFornoDataAvailable,
    loading,
    refetch,
  };
};

export default useRepositories;
