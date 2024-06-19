import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

const Header = () => {
  const { user } = useUser();

  console.log(user?.imageUrl);

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Image
          source={{
            uri: user?.imageUrl || "https://example.com/placeholder.png", // Placeholder image URL
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.fullNameText}>{user?.fullName || "Guest"}</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder="Search here..." style={styles.searchInput} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 50, // Set desired width
    height: 50, // Set desired height
    borderRadius: 25, // To make the image round
    marginRight: 10, // Space between image and text
  },
  welcomeText: {
    color: "white",
  },
  fullNameText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
  },
  searchInput: {
    flex: 1,
    paddingLeft: 5,
  },
});

export default Header;
