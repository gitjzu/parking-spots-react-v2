import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList
} from "react-native";

import Spot from "./Spot";
import Filters from "./Filters";

export default class SpotList extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={styles.container}
            data={this.props.Spots}
            keyExtractor={item => item.id}
            initialNumToRender={10}
            refreshing={this.props.networkStatus === 4}
            onRefresh={this.props.refetch}
            renderItem={this.renderSpot}
            ListFooterComponent={this.renderFooter}
            ListHeaderComponent={
              <Filters
                setFilter={this.props.setFilter}
                filter={this.props.filter}
              />
            }
          />
        )}
      </View>
    );
  }

  renderSpot = ({ item }) => (
    <Spot
      address={item.spot_name}
      coordinates={item.coordinates}
      lat={item.lat}
      lon={item.lon}
      type={item.type}
      distance={item.distance}
    />
  );
  renderFooter = () => {
    return (
      <View style={styles.loadingContainer}>
        {//networkstatus 3 = fetchMore is in flight
        this.props.loading && this.props.networkStatus === 3 && (
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  };

  loadMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.props.loadMoreEntries();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    height: 36
  }
});
