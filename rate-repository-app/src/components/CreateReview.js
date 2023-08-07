import { View } from "react-native";
import { Formik, useField } from "formik";
import * as yup from "yup";
import useSendReview from "../hooks/useSendReview";
import { formStyles } from "../styles/formStyles";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-native";
import FormikTextInput from "./FormikTextInput";

const initialValues = {
  repoOwner: "",
  repoName: "",
  rating: "",
  review: "",
};

const validationSchema = yup.object().shape({
  repoOwner: yup.string().required("Repository Owner is Required"),
  repoName: yup.string().required("Repository Name is Required"),
  rating: yup.number().min(0).max(100),
  review: yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.formContainer}>
      <FormikTextInput
        placeholder="Repository Owner Name"
        name="repoOwner"
        style={formStyles.formTextField}
      />
      <FormikTextInput
        placeholder="Repository  Name"
        name="repoName"
        style={formStyles.formTextField}
      />
      <FormikTextInput
        placeholder="Rating between 0 and 100"
        name="rating"
        style={formStyles.formTextField}
      />
      <FormikTextInput
        placeholder="Review"
        name="review"
        style={{
          ...formStyles.formTextField,
          paddingTop: formStyles.formTextField.padding, // Have to explicitly set top Padding. See here https://github.com/facebook/react-native/issues/33562
        }}
        multiline
      />
      <SubmitButton text={"Create a Review"} onClick={onSubmit} />
    </View>
  );
};

const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const [sendReview] = useSendReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const cleanReviewSendRequest = {
      repositoryName: values.repoName,
      ownerName: values.repoOwner,
      rating: Number(values.rating),
      text: values.review,
    };
    console.log("Submitting Review", cleanReviewSendRequest);
    try {
      const { data } = await sendReview(cleanReviewSendRequest);
      navigate(`/${data.createReview.repositoryId}`);
    } catch (error) {
      console.log("Error sending Review: ", error);
    }
  };
  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
