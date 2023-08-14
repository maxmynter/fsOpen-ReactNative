import { Dimensions, FlatList, View } from "react-native";
import FlatListItemSeparator from "./FlatListItemSeperator";
import { useQuery } from "@apollo/client";
import { GET_LOGGED_IN_USER } from "../graphQL/queries";
import Text from "./Text";
import { StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  reviewItemContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    justifyContent: "flex-start",
  },

  ratingContainer: {
    fontWeight: "bold",
    borderWidth: 4,
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: "blue",
    padding: 5,
    marginRight: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  copyContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1,
    margin: 1,
  },
  repoName: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    paddingBottom: 2,
    flex: 1,
  },
  ratingText: {
    color: "blue",
    fontWeight: theme.fontWeights.bold,
  },
  createdAtText: { paddingTop: 3, paddingBottom: 5 },
  reviewText: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    fontSize: 14,
    color: "black",
    flexShrink: 1,
    width: Dimensions.get("window").width / 1.25,
  },
});

const ReviewItem = ({ createdAt, rating, repository, text }) => {
  const formattedDate = () => {
    return new Date(createdAt).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };
  return (
    <View style={styles.reviewItemContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
      <View styles={styles.copyContainer}>
        <Text style={styles.repoName}>{repository.fullName}</Text>
        <Text style={styles.createdAtText}>{formattedDate()}</Text>
        <Text style={styles.reviewText}>{text}</Text>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { loading, data } = useQuery(GET_LOGGED_IN_USER, {
    variables: { includeReviews: true },
  });
  return (
    <View>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={data.me.reviews.edges.map((edge) => edge.node)}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={({ item }) => {
            return (
              <ReviewItem
                createdAt={item.createdAt}
                rating={item.rating}
                repository={item.repository}
                text={item.text}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default MyReviews;
