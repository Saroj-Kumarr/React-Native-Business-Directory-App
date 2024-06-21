import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants/Colors";
import RNPickerSelect from "react-native-picker-select";

const AddBusiness = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Business",
      headerShown: true,
    });
  }, []);

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View
      style={{
        padding: 10,
        paddingTop: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => imagePicker()}>
        {!image ? (
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
        )}
      </TouchableOpacity>
      <Text>Upload Image</Text>

      <View
        style={{
          gap: 10,
          marginVertical: 30,
        }}
      >
        <TextInput
          value={id}
          onChangeText={setId}
          style={{
            width: 300,
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            padding: 10,
            marginVertical: 2,
          }}
          placeholder="Business Id"
        />

        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            width: 300,
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            padding: 10,
            marginVertical: 2,
          }}
          placeholder="Business Name"
        />
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={{
            width: 300,
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            padding: 10,
            marginVertical: 2,
          }}
          placeholder="Address"
        />
        <TextInput
          value={contact}
          onChangeText={setContact}
          style={{
            width: 300,
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            padding: 10,
            marginVertical: 2,
          }}
          placeholder="Phone Number"
        />
        <TextInput
          value={website}
          onChangeText={setWebsite}
          style={{
            width: 300,
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            padding: 10,
            marginVertical: 2,
          }}
          placeholder="Website"
        />
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={{
            width: 300,
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            padding: 10,
            marginVertical: 2,
          }}
          numberOfLines={3}
          placeholder="Description"
        />

        <View
          style={{
            borderWidth: 2,
            borderColor: Colors.PRIMARY,
            borderRadius: 10,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            placeholder={{
              label: "Select Category",
              value: null,
              color: Colors.PRIMARY,
            }}
            items={[
              { label: "Health", value: "health" },
              { label: "Education", value: "educational" },
              { label: "Painting", value: "Painting" },
            ]}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            console.log(
              id,
              name,
              category,
              address,
              contact,
              website,
              description,
              image
            );
          }}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Create Business</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBusiness;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 20,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
});
