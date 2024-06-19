import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { FlatList } from "react-native";
import BusinessListCard from "@/components/BusinessListCard";

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

const BusinessListByCategory = () => {
  const { category } = useLocalSearchParams();
  const navigation = useNavigation();

  const [businessList, setBusinessList] = useState<BusinessListType[]>([]);

  const getBusinessListByCategory = async () => {
    const q = query(
      collection(db, "Business"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    const categoryList: BusinessListType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as BusinessListType;
      categoryList.push(data);
    });
    setBusinessList(categoryList);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessListByCategory();
  }, []);

  return (
    <View style={{
        padding:10,
    }}>
      {businessList?.length > 0 ? (
        <FlatList
          data={businessList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <BusinessListCard data={item} />}
        />
      ) : (
        <Text>Business Category not found.</Text>
      )}
    </View>
  );
};

export default BusinessListByCategory;
