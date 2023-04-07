import { FlatList, View, Text, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { openURL } from "expo-linking";
import moment from "moment/moment";
import useRepositoryReviews from "../hooks/useRepositoryReviews";
import RepositoryItem from "./RepositoryItem";
import useRepositoryDetails from "../hooks/useRepositoryDetails";
import SubmitButton from "./SubmitButton";
import theme from "../theme";

const styles = StyleSheet.create({
  reviewContainer: {
    display: "flex",
    padding: 8,
    flexDirection: "row",
    backgroundColor: "white",
  },
  reviewScoreContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewStyleText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  reviewTextContainer: {
    marginLeft: 5,
    paddingLeft: 3,
    paddingRight: 3,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  authorText: { fontWeight: theme.fontWeights.bold, paddingBottom: 4 },
  dateText: { paddingBottom: 6 },

  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ reviewItem }) => {
  console.log("REVIEITEM", reviewItem);
  const rating = reviewItem.rating;
  const author = reviewItem.user.username;
  const review = reviewItem.text;
  const createdAt = moment(reviewItem.createdAt).format("DD.MM.YYYY");
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewScoreContainer}>
        <Text style={styles.reviewStyleText}>{rating}</Text>
      </View>
      <View style={styles.reviewTextContainer}>
        <Text style={styles.authorText}>{author}</Text>
        <Text style={styles.dateText}>{createdAt}</Text>
        <Text>{review}</Text>
      </View>
    </View>
  );
};

const RepositoryReviews = (repoID) => {
  const { repositoryReviews } =
    useRepositoryReviews(repoID);
  return (
    <FlatList
      data={repositoryReviews}
      renderItem={({ item }) => <ReviewItem reviewItem={item.node} />}
      keyExtractor={({ node: { id } }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryDetailView = () => {
  const { repoID } = useParams();
  const { repositoryDetails, loading: loadingDetails } =
    useRepositoryDetails(repoID);

  return (
    <>
      <View style={{ backgroundColor: "white" }}>
        {loadingDetails || !repositoryDetails ? null : (
          <RepositoryItem
            title={repositoryDetails.fullName}
            description={repositoryDetails.description}
            language={repositoryDetails.language}
            forksCount={repositoryDetails.forksCount}
            stargazersCount={repositoryDetails.stargazersCount}
            ratingAverage={repositoryDetails.ratingAverage}
            reviewCount={repositoryDetails.reviewCount}
            avatarURL={repositoryDetails.ownerAvatarUrl}
          />
        )}
        <SubmitButton
          text="Open in GitHub"
          onClick={() => {
            openURL(repositoryDetails.url);
          }}
        />
      </View>
      <RepositoryReviews repoID={repoID} />
    </>
  );
};
export default RepositoryDetailView;
