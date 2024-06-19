import { View, Text, Image, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, DocumentData } from "firebase/firestore";
import { db } from "../config/firebase";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
type CategoryType = {
  id: string;
  name: string;
  icon: string;
};

const Category = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategoryList = async () => {
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);

    const categoryList: CategoryType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as CategoryType; // Ensure the data is of type CategoryType
      categoryList.push(data);
    });
    setCategories(categoryList);
  };

  useEffect(() => {
    getCategoryList();
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
          # Categories
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
        data={categories}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link href={"/business/" + item.name} asChild>
            <Pressable
              style={{
                marginVertical: 7,
                marginLeft: 15,
                backgroundColor: "#D6BDFF",
                borderRadius: 15,
                padding: 8,
                width: 80,
                height: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: item.icon }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
};

export default Category;

{
  /*

    id
    category
    description
    address
    contact
    website
    name

     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor id, quidem excepturi accusantium odio praesentium.




    */
}
