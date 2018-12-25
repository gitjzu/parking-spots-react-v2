import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import I18n from "../i18n/i18n";

export default class Filters extends React.Component {
  render() {
    const { setFilter, filter } = this.props;
    return (
      <View style={styles.filters}>
        <Text style={{ fontWeight: "bold", justifyContent: "flex-start" }}>
          {I18n.t("showOnly")}:
        </Text>
        <TouchableOpacity onPress={() => setFilter("2-4H")}>
          <View
            style={{
              ...styles.filter,
              backgroundColor: filter === "2-4H" ? "#0092db" : "#FFF",
              borderColor: filter === "2-4H" ? "#FFF" : "#222"
            }}
          >
            <Text
              style={{
                color: filter === "2-4H" ? "#FFF" : "#222"
              }}
            >
              2-4h
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter("24H")}>
          <View
            style={{
              ...styles.filter,
              backgroundColor: filter === "24H" ? "#0092db" : "#FFF",
              borderColor: filter === "24H" ? "#FFF" : "#222"
            }}
          >
            <Text
              style={{
                color: filter === "24H" ? "#FFF" : "#222"
              }}
            >
              24h
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filters: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  filter: {
    borderRadius: 25,
    borderWidth: 1,
    width: 100,
    height: 40,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#222"
  }
});
