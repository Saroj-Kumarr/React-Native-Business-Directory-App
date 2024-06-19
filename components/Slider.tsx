import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, DocumentData } from "firebase/firestore";
import { db } from "../config/firebase";
type SliderType = {
  name: string;
  imageUrl: string;
};

const Slider = () => {
  const [sliders, setSliders] = useState<SliderType[]>([]);

  const getSliderList = async () => {
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);

    const sliderList: SliderType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as SliderType; // Ensure the data is of type SliderType
      sliderList.push(data);
    });
    setSliders(sliderList);
  };

  useEffect(() => {
    getSliderList();
  }, []);

  return (
    <View
      style={{
        padding: 10,
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
        # Special for you
      </Text>
      <FlatList
        data={sliders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 7,
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: 250,
                height: 160,
                borderRadius: 15,
                marginLeft: 15,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Slider;
