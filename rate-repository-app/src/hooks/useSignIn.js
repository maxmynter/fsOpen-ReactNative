import { LOGIN } from "../graphQL/mutations";
import { useMutation } from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    await mutate({
      variables: { authenticateCredentials2: { username, password } },
    });
    return result;
  };
  return [signIn, result];
};

export default useSignIn;
