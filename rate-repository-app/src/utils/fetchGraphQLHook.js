import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

const generateGraphQLHook = ({ graphQLQuery, queryVariables }) => {
  const [resource, setResource] = useState(null);
  const { data, error, loading, fetchMore } = useQuery(graphQLQuery, {
    variables: queryVariables,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const fetchResource = () => {
    if (loading) {
      console.log("Loading Resource");
    } else {
      if (data === undefined) {
        console.log(`Could not fetch resource. Error message:`, error);
      } else {
        setResource(data);
      }
    }
  };

  useEffect(() => {
    fetchResource();
  }, [loading]);

  return { resource, loading, refetch: fetchResource, fetchMore };
};

export default generateGraphQLHook;
