import React from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";

import Spot from "./Spot";
import Filters from "./Filters";

export default class SpotList extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={styles.container}
            data={this.props.Spots}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            windowSize={10}
            //onRefresh={this.props.loadData}
            //refreshing={this.props.refreshing}
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

  renderFooter = () => (
    <View style={styles.loadingContainer}>
      {//networkstatus 3 = fetchMore is in flight
      this.props.loading && this.props.networkStatus === 3 && (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    height: 36
  }
});
