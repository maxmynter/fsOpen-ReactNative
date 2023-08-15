import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphQL/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const deleteReview = async (reviewId) => {
    const payload = await mutate({
      variables: { deleteReviewId: reviewId },
    });
    return payload;
  };
  return [deleteReview, result];
};
export default useDeleteReview;
