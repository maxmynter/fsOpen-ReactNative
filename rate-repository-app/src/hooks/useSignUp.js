import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphQL/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const payload = await mutate({
      variables: { user: { username, password } },
    });
    return payload;
  };
  return [signUp, result];
};
export default useSignUp;
