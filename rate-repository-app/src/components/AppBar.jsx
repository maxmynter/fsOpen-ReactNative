import { View, Text, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("pressed")}>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
