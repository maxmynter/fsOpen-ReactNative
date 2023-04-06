import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_REPOSITORY_DETAIL } from "../graphQL/queries";

const useRepositoryDetails = (repoID) => {
  const [repositoryDetails, setRepositoryDetails] = useState(null);
  const { data, loading, error } = useQuery(GET_REPOSITORY_DETAIL, {
    variables: { repositoryId: repoID },
    fetchPolicy: "cache-and-network",
  });
  const fetchRepositoryDetails = () => {
    if (loading && !data) {
      setRepositoryDetails(null);
      console.log("Request Loading or error. Error:", error);
    } else {
      setRepositoryDetails(data.repository);
    }
  };
  useEffect(() => {
    fetchRepositoryDetails();
  }, [loading]);
  return { repositoryDetails, loading, refetch: fetchRepositoryDetails };
};

export default useRepositoryDetails;
