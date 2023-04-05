import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphQL/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState(null);
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const fetchRepositories = () => {
    console.log(loading, data, error);
    if (loading || data === undefined) {
      console.log(
        "fetch Repositories loading or data undefined. Setting data to empty array. Errormessage:",
        error
      );
      setRepositories({ edges: [] });
    } else {
      setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [loading]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
