import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

const profile = () => {
  const { user } = useUser();

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
    </View>
  );
};

export default profile;
