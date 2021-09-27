import React from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { StyleSheet, View, Dimensions } from "react-native";
import { Container, Header, Title } from "./styles";
import MapViewDirections from "react-native-maps-directions";

import { categories } from "../../utils/categories";
import { useState, useEffect, useRef } from "react";
import { Text } from "react-native";
import config from "../../config";
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
  const mapEl = useRef(null);
  const [origin, setOrigin] = useState<ILocation>({} as ILocation);
  const [destination, setDestination] = useState();
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0.00);

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
  }, []);

  useEffect(() => {
    console.log(distance)
    const priceTravel = distance * 1.26;
    setPrice(priceTravel)
    console.log(priceTravel.toFixed(2))
  }, [distance])

  return (
    <View style={styles.container}>
      {/* <Text>{config.googleApi}</Text> */}
      {origin.latitude && (
        <MapView style={styles.map} initialRegion={origin} loadingEnabled={true} ref={mapEl}>
          <MapViewDirections
            origin={origin}
            destination={{
              ...origin,
              latitude: -20.4308212,
              longitude: -54.6572411,
            }}
            apikey={config.googleApi}
            strokeWidth={3}
            onReady={result => {
              setDistance(result.distance);
            }}
            // onReady={result => {
            //    mapEl?.current?.fitToCoordinates (
            //     result.coordinates, {
            //       edgePadding: {
            //         top:50,
            //         botton:50,
            //         left:50,
            //         right:50,

            //       }
            //     }
            //   )
            // }}
            
          />
        </MapView>
      )}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
