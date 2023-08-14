import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listHeaderPickerHeader: {
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  listHeaderOpenPicker: {
    minHeight: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  listHeaderOpenPickerText: {
    fontSize: 20,
  },
  pickerStyle: { paddingTop: 3 },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListHeader = ({
  selectedOrdering,
  setSelectedOrdering,
  sortingOptions,
}) => {
  const [open, setOpen] = useState(false);
  const onChangeOrdering = (itemValue) => {
    console.log("Changed Ordering to", itemValue);
    setSelectedOrdering(
      sortingOptions.find((item) => item.value === itemValue)
    );
    setOpen(false);
  };
  return (
    <View>
      {open ? (
        <View>
          <View style={styles.listHeaderPickerHeader}>
            <Text style={styles.listHeaderOpenPickerText}>Select Ordering</Text>
          </View>
          <Picker
            onValueChange={onChangeOrdering}
            selectedValue={selectedOrdering.value}
            styles={styles.pickerStyle}
          >
            {sortingOptions.map((itm, idx) => (
              <Picker.Item key={idx} label={itm.label} value={itm.value} />
            ))}
          </Picker>
        </View>
      ) : (
        <View style={styles.listHeaderOpenPicker}>
          <Pressable
            onPress={() => {
              setOpen(true);
            }}
          >
            <Text style={styles.listHeaderOpenPickerText}>
              {selectedOrdering.label}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export const RepositoryListContainer = ({ repositories }) => {
  const sortingOptions = [
    { label: "Latest", value: "latest" },
    { label: "Rating Increasing", value: "rating-lth" },
    { label: "Rating Decreasing", value: "rating-htl" },
  ];
  const [selectedOrdering, setSelectedOrdering] = useState(sortingOptions[0]);
  const navigate = useNavigate();
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const sortedData = () => {
    switch (selectedOrdering.value) {
      case "latest":
        return repositoryNodes;
      case "rating-lth":
        return repositoryNodes.sort(
          (a, b) => a.ratingAverage - b.ratingAverage
        );
      case "rating-htl":
        return repositoryNodes.sort(
          (a, b) => b.ratingAverage - a.ratingAverage
        );
    }
  };

  return (
    <FlatList
      data={sortedData()}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <ListHeader
          selectedOrdering={selectedOrdering}
          setSelectedOrdering={setSelectedOrdering}
          sortingOptions={sortingOptions}
        />
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            console.log("Navigate To", item.id);
            navigate(`${item.id}`);
          }}
        >
          <RepositoryItem
            key={item.id}
            title={item.fullName}
            description={item.description}
            language={item.language}
            forksCount={item.forksCount}
            stargazersCount={item.stargazersCount}
            ratingAverage={item.ratingAverage}
            reviewCount={item.reviewCount}
            avatarURL={item.ownerAvatarUrl}
          />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
