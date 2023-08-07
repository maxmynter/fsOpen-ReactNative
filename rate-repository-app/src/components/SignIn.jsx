import { View } from "react-native";
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import SubmitButton from "./SubmitButton";
import useSignIn from "../hooks/useSignIn";
import { formStyles } from "../styles/formStyles";

const initialValues = { username: "", password: "" };

const validationSchema = yup.object().shape({
  username: yup.string().required("Username required"),
  password: yup.string().required("Password required"),
});

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.formContainer}>
      <FormikTextInput
        style={formStyles.formTextField}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={formStyles.formTextField}
        name="password"
        placeholder="Password"
      />
      <SubmitButton text="Sign In" onClick={onSubmit} />
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log("Logged In", data);
      navigate("/");
    } catch (e) {
      console.log("Sign In ERROR", e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
