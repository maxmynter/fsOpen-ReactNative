import { View, StyleSheet, ScrollView } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";
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
    marginRight: 15,
  },
});

const AppBar = () => {
  const AppBarLink = ({ text, linkTo }) => {
    return (
      <Link to={linkTo}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarLink text="Sign In" linkTo="/signIn" />
        <AppBarLink text="Repositories" linkTo="/" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
