import { Pressable, Text, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

const initialValues = { username: "", password: "" };

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formTextField: { borderWidth: 1, borderRadius: 5, margin: 8, padding: 16 },
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

const SignInForm = ({ onSubmit }) => {
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

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
