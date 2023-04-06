import { View, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import Text from "./Text";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import useSignOut from "../hooks/useSignOut";
import theme from "../theme";
import { GET_LOGGED_IN_USER } from "../graphQL/queries";

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
  const { data } = useQuery(GET_LOGGED_IN_USER);
  const signOut = useSignOut();

  const AppBarLink = ({ text, linkTo, onPress }) => {
    return (
      <Link to={linkTo} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarLink text="Repositories" linkTo="/" />
        {data && data.me ? (
          <AppBarLink text="Sign Out" linkTo="/signIn" onPress={signOut} />
        ) : (
          <AppBarLink text="Sign In" linkTo="/signIn" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
