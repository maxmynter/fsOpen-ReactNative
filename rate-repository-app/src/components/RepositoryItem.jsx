import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  viewParent: { display: "flex", padding: 5, backgroundColor: "white" },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  titleDescription: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1,
  },
  tinyLogo: { width: 50, height: 50, borderRadius: 7 },
  title: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    paddingBottom: 5,
  },
  description: {},
  tools: {
    backgroundColor: theme.colors.primary,
    marginLeft: 65,
    margin: 15,
    padding: 5,
    borderRadius: 7,
    alignSelf: "left",
  },
  toolsText: {
    color: "white",
    fontSize: theme.fontSizes.subheading,
  },
  statisticsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 25,
  },
  statisticsView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statistticsNumber: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    paddingBottom: 7,
  },
  statisticsName: {},
});

const displayStatistic = (number, name) => {
  const adaptNumberPrecision = (number) => {
    if (number < 1000) return number;
    //Math.round rounds to next integer, therefore rescale for desired decimal places
    if (number > 1000 && number < 1000000)
      return (Math.round((number * 10) / 1000) / 10).toString() + "k";
  };
  return (
    <View style={styles.statisticsView}>
      <Text style={styles.statistticsNumber}>
        {adaptNumberPrecision(number)}
      </Text>
      <Text style={styles.statisticsName}>{name}</Text>
    </View>
  );
};

const RepositoryItem = ({
  title,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  avatarURL,
}) => {
  return (
    <View style={styles.viewParent} testID="repositoryItem">
      <View style={styles.header}>
        <Image style={styles.tinyLogo} source={{ uri: avatarURL }} />
        <View style={styles.titleDescription}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <View style={styles.tools}>
        <Text style={styles.toolsText}>{language}</Text>
      </View>
      <View style={styles.statisticsContainer}>
        {displayStatistic(forksCount, "Forks")}
        {displayStatistic(stargazersCount, "Stars")}
        {displayStatistic(ratingAverage, "Rating")}
        {displayStatistic(reviewCount, "Reviews")}
      </View>
    </View>
  );
};
export default RepositoryItem;
