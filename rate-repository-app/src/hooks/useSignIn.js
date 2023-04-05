import { useApolloClient } from "@apollo/client";
import { LOGIN } from "../graphQL/mutations";
import { useMutation } from "@apollo/client";
import { useAuthStorage } from "../hooks/useAuthStorage";

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    const payload = await mutate({
      variables: { authenticateCredentials2: { username, password } },
    });
    const { data } = payload;
    console.log("Result", data.authenticate.accessToken);
    console.log("Auth Storage", authStorage);
    if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      client.resetStore();
    }
    return payload;
  };
  return [signIn, result];
};

export default useSignIn;
