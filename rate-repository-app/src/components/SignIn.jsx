import { Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";

const initialValues = { username: "", password: "" };

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    paddingBottom: 5,
  },
  formTextField: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 8,
    padding: 16,
    fontFamily: theme.fonts.main,
  },
  formSubmitButton: {
    backgroundColor: theme.colors.primary,
    margin: 8,
    borderRadius: 5,
    padding: 16,
  },
  formSubmitButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username required"),
  password: yup.string().required("Password required"),
});

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        style={styles.formTextField}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={styles.formTextField}
        name="password"
        placeholder="Password"
      />
      <Pressable style={styles.formSubmitButton} onPress={onSubmit}>
        <Text style={styles.formSubmitButtonText}>Sign In</Text>
      </Pressable>
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
