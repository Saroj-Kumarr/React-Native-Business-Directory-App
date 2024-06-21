import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

type BusinessListType = {
  id: string;
  name: string;
  category: string;
  description: string;
  contact: string;
  address: string;
  website: string;
  imageUrl: string;
};

const BusinessListCard = ({ data }: { data: BusinessListType }) => {
  return (
    <Link href={"businesslist/" + data.id} asChild>
      <Pressable style={styles.card}>
        <Image source={{ uri: data.imageUrl }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text
            style={styles.description}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {data.description}
          </Text>
          <Text style={styles.address}>{data.address}</Text>
          <Text style={styles.contact}>{data.contact}</Text>
          <Text style={styles.website}>{data.website}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    borderRadius: 15,
    width: 130,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    color: "#666",
    flexWrap: "wrap",
  },
  address: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },
  contact: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },
  website: {
    fontSize: 12,
    color: "blue",
    marginTop: 5,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
  },
});

export default BusinessListCard;
