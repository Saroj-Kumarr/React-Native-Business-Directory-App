import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const Profile = () => {
  const { user } = useUser();

  const actions = [
    {
      icon: require("../../assets/images/add.png"),
      name: "Add Business",
    },
    {
      icon: require("../../assets/images/business-and-trade.png"),
      name: "My Business",
    },
    {
      icon: require("../../assets/images/share_1.png"),
      name: "Share",
    },
    {
      icon: require("../../assets/images/logout.png"),
      name: "Logout",
    },
  ];

  const handlePress = (item: string) => {
    if (item === "Add Business") {
      router.push("/add-business/addBusiness");
    } else if (item === "My Business") {
      console.log("My Business");
    } else if (item === "Share") {
      console.log("Share");
    } else if (item === "Logout") {
      console.log("Logout");
    }
  };

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
        Profile
      </Text>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: user?.imageUrl,
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {user?.fullName}
          </Text>
          <Text
            style={{
              color: "gray",
              letterSpacing: 1,
            }}
          >
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 100,
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {actions.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item.name)}
            style={{
              borderWidth: 1,
              borderColor: Colors.PRIMARY,
              padding: 5,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              width: 180,
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                color: "gray",
                marginLeft: 10,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text
        style={{
          color: "gray",
          marginVertical: 100,
          textAlign: "center",
        }}
      >
        Designed and Developed by saroj kumar
      </Text>
    </View>
  );
};

export default Profile;
