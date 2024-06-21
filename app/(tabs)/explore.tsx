import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Slider from "@/components/Slider";
import Category from "@/components/Category";

const explore = () => {
  return (
    <View
      style={{
        padding: 10,
        paddingTop: 30,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        Explore More
      </Text>
      <View>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
          <TextInput placeholder="Search here..." style={styles.searchInput} />
        </View>
      </View>

      <Category explore={true} />

    </View>
  );
};

export default explore;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "90%",
    margin: "auto",
    marginVertical: 20,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 5,
  },
});
