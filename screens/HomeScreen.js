import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { AdMobBanner } from "expo";
import { graphql, withApollo } from "react-apollo";
import SpotList from "../components/SpotList";
import { bannerAdUnitId } from "../configs/config.js";
import { orderByDistance } from "../util";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: null,
      data: props.screenProps.data,
      loading: false
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidUpdate(prevProps) {
    if (prevProps.screenProps.data !== this.props.screenProps.data) {
      if (this.props.screenProps.location) {
        this.setState({
          data: orderByDistance(
            this.props.screenProps.location.coords,
            this.props.screenProps.data
          ),
          loading: false
        });
      } else {
        this.setState({
          data: this.props.screenProps.data
        });
      }
    }
  }

  componentDidMount() {
    if (this.props.screenProps.location && this.props.screenProps.data)
      this.setState({
        data: orderByDistance(
          this.props.screenProps.location.coords,
          this.props.screenProps.data
        ),
        loading: false
      });
  }

  _setFilter = filter => {
    const filtered =
      filter === this.state.filter
        ? this.props.screenProps.data
        : this.props.screenProps.data.filter(spot => spot.type === filter);
    this.setState({
      filter: filter === this.state.filter ? null : filter,
      data: filtered
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.adContainer}>
          <AdMobBanner
            bannerSize="banner"
            adUnitID={bannerAdUnitId}
            onDidFailToReceiveAdWithError={this.bannerError}
          />
        </View>
        {this.props.screenProps.data && (
          <SpotList
            filter={this.state.filter}
            setFilter={this._setFilter}
            Spots={this.state.data}
            loading={this.state.loading}
            loadData={this.props.screenProps.loadData}
            refreshing={this.props.screenProps.refreshing}
            networkStatus={this.networkStatus}
          />
        )}
      </View>
    );
  }
}

export default withApollo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 40
  },
  adContainer: {
    alignItems: "center",
    marginBottom: 5
  }
});
