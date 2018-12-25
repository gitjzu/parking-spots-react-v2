import React, { PureComponent } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { MapView } from "expo";
import getDirections from "react-native-google-maps-directions";

import { regionFrom } from "../util";
import I18n from "../i18n/i18n";

export default class Spot extends PureComponent {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    region = regionFrom(this.props.lat, this.props.lon);

    this.setState({
      region
    });
  }

  render() {
    const { distance, lat, lon, coordinates, address, type } = this.props;

    return (
      <View style={styles.container}>
        {this.state.region && (
          <View>
            <MapView
              style={styles.map}
              region={this.state.region}
              liteMode
              showsUserLocation
              toolbarEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              cacheEnabled={true}
            >
              {coordinates.length === 1 ? (
                <MapView.Marker
                  coordinate={coordinates[0]}
                  pinColor="#304ffe"
                />
              ) : (
                <MapView.Polyline
                  coordinates={coordinates}
                  strokeWidth={5}
                  strokeColor="#304ffe"
                />
              )}
            </MapView>
          </View>
        )}
        <View style={styles.cardBottom}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={styles.address}>
              {address} ({type})
            </Text>
          </View>
          <View style={styles.distanceContainer}>
            <Text style={{ marginRight: 5 }}>
              {distance ? <Text>{distance} km</Text> : <Text>-- km</Text>}
            </Text>
            <Button title={I18n.t("navigateHere")} onPress={this.navigate} />
          </View>
        </View>
      </View>
    );
  }

  navigate = () => {
    const data = {
      destination: {
        latitude: this.props.lat,
        longitude: this.props.lon
      },
      params: []
    };
    getDirections(data);
  };
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#FFF"
  },
  cardBottom: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 8,
    marginRight: 8,
    alignItems: "center"
  },
  map: {
    height: 150
  },
  address: {
    fontSize: 15,
    margin: 10,
    justifyContent: "flex-start",
    flex: 1
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1
  }
});
