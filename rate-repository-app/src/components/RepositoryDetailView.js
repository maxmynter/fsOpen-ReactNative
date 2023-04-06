import { View } from "react-native";
import { useParams } from "react-router-native";
import { openURL } from "expo-linking";
import RepositoryItem from "./RepositoryItem";
import useRepositoryDetails from "../hooks/useRepositoryDetails";
import SubmitButton from "./SubmitButton";

const RepositoryDetailView = () => {
  const { repoID } = useParams();
  const { repositoryDetails, loading } = useRepositoryDetails(repoID);

  return (
    <View style={{ backgroundColor: "white" }}>
      {loading || !repositoryDetails ? null : (
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
  );
};
export default RepositoryDetailView;
