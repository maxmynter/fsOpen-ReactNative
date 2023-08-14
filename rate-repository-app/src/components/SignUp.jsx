import { View } from "react-native";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import SubmitButton from "./SubmitButton";
import { formStyles } from "../styles/formStyles";
import { Formik } from "formik";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const initialValues = { username: "", password: "", passwordConfirm: "" };

const validationSchema = yup.object().shape({
  Username: yup.string().min(5).max(30).required("Username required"),
  Password: yup.string().min(5).max(50).required("Password required"),
  PasswordConfirm: yup
    .string()
    .oneOf(
      [yup.ref("Password"), null],
      "Password and password confirmation must match"
    )
    .required("Password confirmation required"),
});

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.formContainer}>
      <FormikTextInput
        style={formStyles.formTextField}
        name="Username"
        placeholder="Username"
      />
      <FormikTextInput
        style={formStyles.formTextField}
        name="Password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <FormikTextInput
        style={formStyles.formTextField}
        name="PasswordConfirm"
        placeholder="Repeat Password"
        secureTextEntry={true}
      />
      <SubmitButton text="Sign Up" onClick={onSubmit} />
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { Username, Password } = values;
    try {
      await signUp({
        username: Username,
        password: Password,
      });
      const { data: signInData } = await signIn({
        username: Username,
        password: Password,
      });
      console.log("Created and Logged In", signInData);
      navigate("/");
    } catch (e) {
      console.log("Sign Up ERROR", e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
