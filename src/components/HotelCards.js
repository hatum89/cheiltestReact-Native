import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";
import {
  Card,
  ListItem,
  Icon,
  Image,
  Header,
  SearchBar,
  Button,
  Rating,
  AirbnbRating,
} from "react-native-elements";
import { useAssets } from "expo-asset";

const HotelCards = () => {
  const [query, setQuery] = useState('');
  const [state, setState] = useState([]);
  useEffect(() => {
    axios.get("http://192.168.1.2:3000/hotels").then((resp) => {
      // console.log(resp);
      setState(resp.data);
    });
  }, []);

  const handleSearch = (value) => {
    const toLowerCase = value.toLowerCase();
    setQuery(toLowerCase);
  };

  return (
    <View>
      <Header
        placement="right"
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "CHEIL", style: { color: "#fff" } }}
      />
      <SearchBar
        onChangeText={(val) => {
          handleSearch(val);
        }}
        placeholder="Escriba aqui..."
        value={query}
      />

      <ScrollView>
        <View>
          <Text>{query}</Text>

          {
            state.filter((value) => {
             if(value == ''){
               return value;
             } else if (value.name.toLowerCase().includes(query)){
               return value;
             }
            })
          .map((hotel, i) => {
            return (
              <View key={i}>
                <Card>
                  <Card.Title>{hotel.name}</Card.Title>
                  <Card.Divider />
                  <Image
                    source={{ uri: hotel.img }}
                    style={{ width: 500, height: 200 }}
                  />
                  <Text style={{fontWeight:'bold'}}>{hotel.description}</Text>
                  <AirbnbRating size={25} reviews={['']} isDisabled={true} count={5} defaultRating={hotel.stars} />
                </Card>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default HotelCards;
