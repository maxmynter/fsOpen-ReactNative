import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphQL/mutations";

const useSendReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const sendReview = async (reviewDetails) => {
    console.log("reviewDetails", reviewDetails);
    const payload = await mutate({
      variables: { review: { ...reviewDetails } },
    });
    return payload;
  };

  return [sendReview, result];
};

export default useSendReview;
