import { View } from "react-native";
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import SubmitButton from "./SubmitButton";
import useSignIn from "../hooks/useSignIn";
import { formStyles } from "../styles/formStyles";

const initialValues = { Username: "", Password: "" };

const validationSchema = yup.object().shape({
  Username: yup.string().required("Username required"),
  Password: yup.string().required("Password required"),
});

export const SignInForm = ({ onSubmit }) => {
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
    const { Username, Password } = values;
    try {
      const { data } = await signIn({ username: Username, password: Password });
      console.log("Logged In", data);
      navigate("/");
    } catch (e) {
      console.log("Sign In ERROR", e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
