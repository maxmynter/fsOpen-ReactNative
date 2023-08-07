import { StyleSheet } from "react-native";
import theme from "../theme";

export const formStyles = StyleSheet.create({
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
});
