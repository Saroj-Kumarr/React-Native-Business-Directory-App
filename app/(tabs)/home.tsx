import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Header";
import Slider from "@/components/Slider";
import Category from "@/components/Category";
import Business from "@/components/Business";
import { ScrollView } from "react-native";

const home = () => {
  return (
    <ScrollView
      style={{
        marginBottom: 50,
      }}
    >
      <Header />   
      <Slider />
      <Category />
      <Business />
    </ScrollView>
  );
};

export default home;
