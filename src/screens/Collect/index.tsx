import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import config from "../../config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

interface ILocation {
  latitude?: number;
  longitude?: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export function Collect() {
  const [destination, setDestination] = useState<ILocation>({} as ILocation);

  useEffect(() => {
    console.log(destination);
  }, [destination]);
  
  return (
    <View style={styles.container}>
      <Text>Teste:{config.googleApi}</Text>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Informe o destino:"
          onPress={(data, details = null) => {
            setDestination({
              latitude: details?.geometry.location.lat,
              longitude: details?.geometry.location.lng,
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421,
            });
          }}
          query={{
            key: config.googleApi,
            language: "pt-br",
          }}
          fetchDetails={true}
          styles={{ listView: { height: 100 } }}
          onFail={(error) => console.error(error)}
        />
      </View>
    </View>
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
  searchContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "black",
  },
});
