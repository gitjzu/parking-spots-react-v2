import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import {
  AppLoading,
  Asset,
  Font,
  Icon,
  Location,
  Constants,
  Permissions,
  MapView
} from "expo";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

import AppNavigator from "./navigation/AppNavigator";
import { api } from "./configs/config.js";
import { allSpotsQuery } from "./components/queries";
import { orderByDistance } from "./util";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      data: null,
      location: null,
      errorMessage: null,
      refreshing: false
    };

    // Initialize new cache, we'll restore any persisted cache later on to this one
    this.cache = new InMemoryCache();

    // Create Apollo Client that we use to query data
    this.client = new ApolloClient({
      link: createHttpLink({
        uri: api
      }),
      cache: this.cache
    });
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    if (status === "granted") {
      this.setState({
        errorMessage: null
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const orderedData = orderByDistance(location.coords, this.state.data);
    this.setState({
      location,
      data: orderedData
    });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <ApolloProvider client={this.client}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator
              screenProps={{
                data: this.state.data,
                location: this.state.location,
                loadData: this.loadData,
                refreshing: this.state.refreshing
              }}
            />
          </View>
        </ApolloProvider>
      );
    }
  }

  loadData = async () => {
    this.setState({
      refreshing: true
    });
    /**
     * this.client.query tries to first fetch data from cache
     * but if no data is in cache, it fetches from server
     */
    const data = await this.client.query({
      query: allSpotsQuery
    });

    this.setState({
      data: data.data.Spots,
      refreshing: false
    });

    return Promise.resolve();
  };

  _loadResourcesAsync = async () => {
    // Load persisted cache from disk before trying to load data from cache
    await persistCache({
      cache: this.cache,
      storage: AsyncStorage
    });
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      }),
      this.loadData()
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
