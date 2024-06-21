import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView,
  ToastAndroid,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { useUser } from "@clerk/clerk-expo";
import { Entypo } from "@expo/vector-icons";

type BusinessDetailType = {
  id: string;
  name: string;
  address: string;
  contact: string;
  website: string;
  description: string;
  category: string;
  imageUrl: string;
};

const BusinessDetailScreen = () => {
  const params = useLocalSearchParams();
  const businessId = params.businessId as string;
  const [rating, setRating] = useState("");
  const [inputText, setInputText] = useState("");

  const { user } = useUser();

  const [businessList, setBusinessList] = useState<BusinessDetailType[]>([]);
  const [loading, setLoading] = useState(true);

  const actionButtons = [
    {
      id: "1",
      name: "Call",
      icon: require("../../assets/images/call.png"),
      url: "tel:8638316090",
    },
    {
      id: "2",
      name: "Location",
      icon: require("../../assets/images/pin.png"),
      url: "geo:0,0?q=" + encodeURIComponent(businessList[0]?.address),
    },
    {
      id: "3",
      name: "Web",
      icon: require("../../assets/images/web.png"),
      url: businessList[0]?.website.startsWith("http")
        ? businessList[0]?.website
        : "http://" + businessList[0]?.website,
    },
    {
      id: "4",
      name: "Share",
      icon: require("../../assets/images/share.png"),
      url: "tel:" + businessList[0]?.contact,
    },
  ];

  const getBusinessDetailById = async (businessId: string) => {
    const q = query(collection(db, "Business"), where("id", "==", businessId));
    const querySnapshot = await getDocs(q);

    const categoryList: BusinessDetailType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as BusinessDetailType;
      categoryList.push(data);
    });
    setBusinessList(categoryList);
    setLoading(false);
  };

  useEffect(() => {
    if (businessId) {
      getBusinessDetailById(businessId);
    }
  }, [businessId]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        padding: 10,
        paddingVertical: 30,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {businessList ? (
        <>
          <View>
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: businessList[0].imageUrl }}
                style={{
                  height: 300,
                  width: "100%",
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  padding: 10,
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Ionicons
                  name="caret-back-circle-outline"
                  size={28}
                  color={Colors.PRIMARY}
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    router.back();
                  }}
                />
                <Feather name="heart" size={28} color={Colors.PRIMARY} />
              </View>
            </View>
          </View>

          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginTop: 15,
              textTransform: "capitalize",
            }}
          >
            {businessList[0].name}
          </Text>

          <Text
            style={{
              textAlign: "center",
              marginTop: 15,
              color: "gray",
            }}
          >
            {businessList[0].address}
          </Text>

          <View
            style={{
              paddingTop: 5,
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {actionButtons.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.name == "Share") {
                        Share.share({
                          message:
                            businessList[0].name +
                            "\n" +
                            businessList[0].address +
                            "\n" +
                            businessList[0].description,
                        });
                        return;
                      }
                      Linking.openURL(item.url);
                    }}
                    style={{ alignItems: "center", marginVertical: 10 }}
                  >
                    <Image
                      source={item.icon}
                      style={{ width: 50, height: 50 }}
                    />
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text
              style={{
                fontWeight: "normal",
                lineHeight: 20,
                letterSpacing: 1,
                textAlign: "center",
                marginTop: 10,
                color: "gray",
              }}
            >
              {businessList[0].description}
            </Text>

            <View
              style={{
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Reviews
              </Text>

              <Rating
                onFinishRating={(rating: string) => setRating(rating)}
                style={{ paddingVertical: 10 }}
              />

              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: "gray",
                  padding: 10,
                  paddingVertical: 20,
                  borderRadius: 10,
                }}
                placeholder="Enter your review..."
                value={inputText}
                onChangeText={setInputText}
              />

              <TouchableOpacity
                disabled={!inputText}
                style={[
                  {
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: Colors.PRIMARY,
                    marginVertical: 20,
                  },
                  {
                    backgroundColor: inputText ? Colors.PRIMARY : "gray",
                  },
                ]}
                onPress={() => {
                  ToastAndroid.show(
                    "Comment added successfully.",
                    ToastAndroid.BOTTOM
                  );
                  console.log(user?.fullName);
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 18,
                    letterSpacing: 1,
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  marginVertical: 15,
                  fontSize: 18,
                  color: Colors.PRIMARY,
                  fontWeight: "bold",
                }}
              >
                Customer's rating and reviews
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  borderWidth: 2,
                  borderColor: "gray",
                  padding: 10,
                  borderRadius: 20,
                  position: "relative",
                }}
              >
                <Image
                  source={{
                    uri: user?.imageUrl,
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {user?.fullName}
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odit ducimus et aperiam incidunt asperiores inventore.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="star" size={20} color="#F1C410" />
                  <Text>4.5</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  borderWidth: 2,
                  borderColor: "gray",
                  padding: 10,
                  borderRadius: 20,
                  marginTop: 20,
                  position: "relative",
                }}
              >
                <Image
                  source={{
                    uri: "https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderWidth: 2,
                    borderColor: "#39B6D3",
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    John Doe
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odit ducimus et aperiam incidunt asperiores inventore.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="star" size={20} color="#F1C410" />
                  <Text>4.2</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  borderWidth: 2,
                  borderColor: "gray",
                  padding: 10,
                  borderRadius: 20,
                  marginTop: 20,
                  position: "relative",
                }}
              >
                <Image
                  source={{
                    uri: "https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-user-avatar-placeholder-black-png-image_3918427.jpg",
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 25,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Steven
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odit ducimus et aperiam incidunt asperiores inventore.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="star" size={20} color="#F1C410" />
                  <Text>4.8</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                height: 50,
              }}
            ></View>
          </View>
        </>
      ) : (
        <Text>No details found for the business with ID {businessId}</Text>
      )}
    </ScrollView>
  );
};

export default BusinessDetailScreen;
