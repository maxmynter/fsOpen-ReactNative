import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

import useRepositories from "../hooks/useRepositories";
import { useState } from "react";
import TextInput from "./TextInput";
import { formStyles } from "../styles/formStyles";
import FlatListItemSeparator from "./FlatListItemSeperator";

const styles = StyleSheet.create({
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
  headerStyle: { backgroundColor: "white" },
});

const ListHeader = ({
  selectedOrdering,
  setSelectedOrdering,
  sortingOptions,
  searchFieldValue,
  setSearchFieldValue,
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
    <View styles={styles.headerStyle}>
      <TextInput
        style={formStyles.formTextField}
        value={searchFieldValue}
        onChangeText={(text) => setSearchFieldValue(text)}
        placeholder="Search ..."
      />
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

export const RepositoryListContainer = ({
  searchFieldValue,
  setSearchFieldValue,
  repositories,
  onEndReach,
}) => {
  const sortingOptions = [
    { label: "Latest", value: "latest" },
    { label: "Rating Increasing", value: "rating-lth" },
    { label: "Rating Decreasing", value: "rating-htl" },
  ];
  const [selectedOrdering, setSelectedOrdering] = useState(sortingOptions[0]);
  const navigate = useNavigate();

  const sortedData = () => {
    switch (selectedOrdering.value) {
      case "latest":
        return repositories;
      case "rating-lth":
        return repositories.sort((a, b) => a.ratingAverage - b.ratingAverage);
      case "rating-htl":
        return repositories.sort((a, b) => b.ratingAverage - a.ratingAverage);
    }
  };

  return (
    <FlatList
      data={sortedData()}
      ItemSeparatorComponent={FlatListItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <ListHeader
          selectedOrdering={selectedOrdering}
          setSelectedOrdering={setSelectedOrdering}
          sortingOptions={sortingOptions}
          searchFieldValue={searchFieldValue}
          setSearchFieldValue={setSearchFieldValue}
        />
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            console.log("Navigate To", item.id);
            navigate(`/${item.id}`);
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
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const refetchStep = 8;
  let { repositories, fetchMore } = useRepositories({
    searchKeyword: searchFieldValue,
    first: refetchStep,
  });

  return (
    <RepositoryListContainer
      repositories={
        repositories ? repositories.edges.map((edge) => edge.node) : []
      }
      searchFieldValue={searchFieldValue}
      setSearchFieldValue={setSearchFieldValue}
      onEndReachedThreshold={0.5}
      onEndReach={() => {
        console.log("Fetching More");
        fetchMore({
          first: refetchStep,
          searchKeyword: searchFieldValue,
        });
      }}
    />
  );
};

export default RepositoryList;
