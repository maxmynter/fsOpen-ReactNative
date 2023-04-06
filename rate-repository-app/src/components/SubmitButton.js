import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
const styles = StyleSheet.create({
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

const SubmitButton = ({ text, onClick }) => {
  return (
    <Pressable
      style={styles.formSubmitButton}
      onPress={onClick ? onClick : null}
    >
      <Text style={styles.formSubmitButtonText}>{text}</Text>
    </Pressable>
  );
};

export default SubmitButton;
