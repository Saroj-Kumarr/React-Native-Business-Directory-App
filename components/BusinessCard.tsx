import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

type BusinessTypeProps = {
  id: string;
  name: string;
  address: string;
  contact: string;
  website: string;
  description: string;
  category: string;
  imageUrl: string;
};

const BusinessCard = ({ data }: { data: BusinessTypeProps }) => {
  return (
    <Link href={"/businesslist/" + data.id} asChild>
      <TouchableOpacity
        style={{
          marginLeft: 12,
          backgroundColor: "#CFCFCF",
          padding: 10,
          borderRadius: 15,
          width: 220,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{
            uri: data.imageUrl,
          }}
          height={120}
          width={200}
          style={{
            borderRadius: 15,
          }}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {data.name}
        </Text>

        <Text
          style={{
            fontSize: 10,
            color: "gray",
            textAlign: "center",
          }}
        >
          {data.description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Entypo name="star" size={18} color="#FBE01D" />
            <Text>4.5</Text>
          </View>
          <View
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: Colors.PRIMARY,
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              # {data.category}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default BusinessCard;
