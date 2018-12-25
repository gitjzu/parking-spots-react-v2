import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Linking } from "react-native";
import I18n from "../i18n/i18n";

export default class FaqScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={{ fontWeight: "bold" }}>{I18n.t("question")}:</Text>
          <Text style={styles.question}>{I18n.t("q1")}</Text>

          <Text style={{ fontWeight: "bold" }}>{I18n.t("answer")}:</Text>
          <Text style={styles.answer}>{I18n.t("a1")}</Text>
        </View>

        <View style={styles.card}>
          <Text style={{ fontWeight: "bold" }}>{I18n.t("question")}:</Text>
          <Text style={styles.question}>{I18n.t("q2")}</Text>

          <Text style={{ fontWeight: "bold" }}>{I18n.t("answer")}:</Text>
          <Text
            style={styles.answer}
            onPress={() => Linking.openURL("http://tinyurl.com/y73zcj8s")}
          >
            {I18n.t("a2")}: http://tinyurl.com/y73zcj8s
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={{ fontWeight: "bold" }}>{I18n.t("question")}:</Text>
          <Text style={styles.question}>{I18n.t("q3")}</Text>

          <Text style={{ fontWeight: "bold" }}>{I18n.t("answer")}:</Text>
          <Text style={styles.answer}>{I18n.t("a3")}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  question: {
    fontSize: 16,
    paddingBottom: 5
  },
  answer: {
    fontSize: 16,
    paddingBottom: 10
  },
  container: {
    flex: 1,
    margin: 10
  },
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "#b7b5b5"
  }
});
