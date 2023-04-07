import generateGraphQLHook from "../utils/fetchGraphQLHook";
import { GET_REPOSITORY_DETAIL } from "../graphQL/queries";

const useRepositoryDetails = (repoID) => {
  const { resource, loading, refetch } = generateGraphQLHook({
    graphQLQuery: GET_REPOSITORY_DETAIL,
    queryVariables: { repositoryId: repoID },
  });
  const ReturnValueFornoDataAvailable = null;
  return {
    repositoryDetails:
      resource != null ? resource.repository : ReturnValueFornoDataAvailable,
    loading,
    refetch,
  };
};

export default useRepositoryDetails;
