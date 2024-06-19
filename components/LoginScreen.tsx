import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
const loginImage = require("../assets/images/login.png");

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={loginImage} style={styles.image} />
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          The Ultimate{" "}
          <Text style={styles.subTitle}>Community Business Directory</Text>
          App
        </Text>
        <Text style={styles.detail}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          cumque ipsum est numquam cum tenetur.
        </Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Let's get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  subContainer: {
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  image: {
    height: 450,
    width: 220,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "black",
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    textAlign: "center",
  },
  subTitle: {
    color: Colors.PRIMARY,
    fontSize: 24,
  },
  detail: {
    color: "gray",
    fontSize: 12,
    textAlign: "center",
    marginVertical: 10,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 8,
    borderRadius: 20,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
});
