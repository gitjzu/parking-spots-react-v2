import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { graphql, withApollo } from "react-apollo";
import SpotList from "../components/SpotList";
import { orderByDistance } from "../util";

const QUERY_LIMIT = 10;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queryOffset: 0,
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
    const { location, errorMessage } = this.state;
    // if (
    //   errorMessage &&
    //   errorMessage === "Permission to access location was denied"
    // ) {
    //   return (
    //     <View style={styles.locationPermissionContainer}>
    //       <Text style={[styles.locationPermissionTxt, styles.emoji]}>🗺️📍</Text>
    //       <Text style={styles.locationPermissionTxt}>
    //         {I18n.t("noLocation")}
    //       </Text>
    //     </View>
    //   );
    // } else
    return (
      <View style={styles.container}>
        {/* <SpotListWithData
          userLat={location ? location.coords.latitude : null}
          userLon={location ? location.coords.longitude : null}
          queryOffset={this.state.queryOffset}
          filter={this.state.filter}
          setFilter={this._setFilter}
        /> */}

        {this.props.screenProps.data && (
          <SpotList
            filter={this.state.filter}
            setFilter={this._setFilter}
            Spots={this.state.data}
            loading={this.state.loading}
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
  locationPermissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  },
  locationPermissionTxt: {
    fontSize: 20,
    textAlign: "center"
  },
  emoji: {
    fontSize: 35
  }
});

// const SpotListWithData = graphql(allSpotsQuery, {
//   options: ({ userLat, userLon, queryOffset, filter }) => ({
//     variables: {
//       userLat,
//       userLon,
//       type: filter,
//       offset: queryOffset,
//       limit: QUERY_LIMIT
//     },
//     fetchPolicy: "network-only",
//     notifyOnNetworkStatusChange: true
//   }),
//   props({ data: { Spots, fetchMore, loading, networkStatus, refetch } }) {
//     return {
//       Spots,
//       loading,
//       networkStatus,
//       refetch,
//       loadMoreEntries: () => {
//         return fetchMore({
//           variables: {
//             offset: Spots.length
//           },
//           updateQuery: (previousResult, { fetchMoreResult }) => {
//             if (!fetchMoreResult) {
//               return previousResult;
//             }
//             return Object.assign({}, previousResult, {
//               // Append the new feed results to the old one
//               Spots: [...previousResult.Spots, ...fetchMoreResult.Spots]
//             });
//           }
//         });
//       }
//     };
//   }
// })(SpotList);
