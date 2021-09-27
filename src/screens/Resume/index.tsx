import React from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { StyleSheet, View, Dimensions } from 'react-native';
import { Container, Header, Title } from "./styles";

import { categories } from "../../utils/categories";
import { useState, useEffect } from "react";
import { Text } from "react-native";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

interface ILocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export function Resume() {
  const [origin, setOrigin] = useState<ILocation>({} as ILocation);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: 1 });
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0521,
      });
      // console.log(location);
    })();
    console.log("passou");
  }, []);

  return (
    <View style={styles.container}>
    {origin.latitude &&

    <MapView style={styles.map} initialRegion={origin} />
    }
  </View>
    // <>
    //   <Text>Teste</Text>
    //   <MapView
    //     initialRegion={{
    //       latitude: -20.456606254176766,
    //       longitude: -54.62196578712625,
    //       latitudeDelta: 0.000922,
    //       longitudeDelta: 0.000421,
    //     }}
    //     showsUserLocation={true}
    //   ></MapView>
    // </>

    //<Container>
    //   <Header>
    //     <Title>Pedidos</Title>
    //   </Header>
    //   <Text>teste</Text>
    //   {origin.latitude &&

    //   }
    // </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

