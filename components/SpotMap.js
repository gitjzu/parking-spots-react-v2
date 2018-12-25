import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import { MapView, AdMobInterstitial } from "expo";
import getDirections from "react-native-google-maps-directions";
import I18n from "../i18n/i18n";
import { interstitialAdUnitId } from "../configs/config";
import { regionFrom } from "../util";
import SlidelInView from "./SlidelInView";
import TabBarIcon from "./TabBarIcon";

export default class SpotMap extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      region: regionFrom(60.179445, 24.938529, 8000),
      coordinates: null,
      selectedSpot: null
    };
    this.mapRef = null;
  }

  /**
   * On Android devices pressing a marker automatically adjusts the map
   * position to that marker coordinates. There is no similar functionality
   * for Android polylines or iOS markers & polylines
   */
  _onPress = spot => {
    this.setState({
      selectedSpot: spot
    });
  };

  _onPressPoly = spot => {
    this.setState({
      selectedSpot: spot
    });

    this.mapRef.fitToCoordinates(spot.coordinates, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 }
    });
  };

  _navigate = () => {
    const { selectedSpot } = this.state;
    const data = {
      destination: {
        latitude: selectedSpot.lat,
        longitude: selectedSpot.lon
      },
      params: []
    };
    getDirections(data);
  };

  _clearSelection = () => {
    this.setState({
      selectedSpot: null
    });
  };

  async componentDidMount() {
    // AdMobInterstitial.setAdUnitID(interstitialAdUnitId);
    // await AdMobInterstitial.requestAdAsync();
    // await AdMobInterstitial.showAdAsync();
  }

  render() {
    const { selectedSpot } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.mapRef = ref;
          }}
          style={styles.container}
          initialRegion={this.state.region}
          showsUserLocation
          provider="google"
          toolbarEnabled={false}
          //kmlSrc="https://s3.eu-north-1.amazonaws.com/ilmaisparkki/parking_spots_2017.kml"
        >
          {this.props.screenProps.data.map(spot => (
            <React.Fragment key={`${spot.lat}${spot.lon}`}>
              {spot.coordinates.length === 1 ? (
                <MapView.Marker
                  coordinate={spot.coordinates[0]}
                  pinColor={spot.type === "24H" ? "#304ffe" : "#222"}
                  onPress={() => this._onPress(spot)}
                />
              ) : (
                <React.Fragment>
                  <MapView.Polyline
                    coordinates={spot.coordinates}
                    strokeWidth={5}
                    strokeColor={spot.type === "24H" ? "#304ffe" : "#222"}
                    onPress={() => this._onPressPoly(spot)}
                    tappable
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </MapView>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View
              style={{ ...styles.headerLabel, backgroundColor: "#304ffe" }}
            />
            <Text>24H - {I18n.t("blue")}</Text>
          </View>
          <View style={styles.header}>
            <View style={{ ...styles.headerLabel, backgroundColor: "#222" }} />
            <Text>2-4H - {I18n.t("black")}</Text>
          </View>
        </View>

        <SlidelInView show={selectedSpot}>
          <TouchableOpacity style={styles.clear} onPress={this._clearSelection}>
            <TabBarIcon size={35} color="#ff0000" name="ios-close" />
          </TouchableOpacity>
          {selectedSpot && (
            <View style={styles.infoContainer}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  textAlign: "center"
                }}
              >
                {selectedSpot.spot_name} ({selectedSpot.type})
              </Text>
              {selectedSpot.distance && (
                <Text style={{ paddingTop: 5, paddingBottom: 5 }}>
                  ~{selectedSpot.distance}km {I18n.t("fromCurrentLocation")}
                </Text>
              )}
              <Button onPress={this._navigate} title={I18n.t("navigateHere")} />
            </View>
          )}
        </SlidelInView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Icon: {
    color: "#FFFFFF",
    fontSize: 50
  },
  headerContainer: {
    position: "absolute",
    top: 50,
    right: 20
  },
  header: { flexDirection: "row", marginBottom: 10 },
  headerLabel: {
    height: 20,
    width: 20,
    marginRight: 5
  },
  infoContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  },
  clear: {
    position: "absolute",
    right: 25,
    top: 10
  }
});
