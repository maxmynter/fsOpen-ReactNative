import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphQL/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState(null);
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const fetchRepositories = () => {
    if (!loading) {
      setRepositories(data.repositories);
    } else {
      setRepositories({ edges: [] });
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [loading]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
