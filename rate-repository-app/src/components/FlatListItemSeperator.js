import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const FlatListItemSeparator = () => <View style={styles.separator} />;

export default FlatListItemSeparator;
