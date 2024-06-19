import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, DocumentData } from "firebase/firestore";
import { db } from "../config/firebase";
import { Colors } from "@/constants/Colors";
import BusinessCard from "./BusinessCard";

type BusinessType = {
  id: string;
  name: string;
  address: string;
  contact: string;
  website: string;
  description: string;
  category: string;
  imageUrl: string;
};

const Business = () => {
  const [business, setBusiness] = useState<BusinessType[]>([]);

  const getBusinessList = async () => {
    const q = query(collection(db, "Business"));
    const querySnapshot = await getDocs(q);

    const businessList: BusinessType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as BusinessType;
      businessList.push(data);
    });
    setBusiness(businessList);
  };

  useEffect(() => {
    getBusinessList();
  }, []);

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 7,
          }}
        >
          # Popular Business
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 7,
          }}
        >
          View all
        </Text>
      </View>
      <FlatList
        data={business}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <BusinessCard data={item} />}
      />
    </View>
  );
};

export default Business;
