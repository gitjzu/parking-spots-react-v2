import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Share
} from "react-native";
import I18n from "../i18n/i18n";
import TabBarIcon from "../components/TabBarIcon";
import {
  linkToPlayStore,
  linkToItunesStore,
  devEmail
} from "../configs/config";

export default class FaqScreen extends Component {
  handleMail = () => {
    return Linking.openURL(`mailto:${devEmail}`);
  };

  handleShare = () => {
    return Share.share(
      {
        message:
          I18n.t("shareMessage") +
          `Android: ${linkToPlayStore}, iOS: ${linkToItunesStore}`,
        title: I18n.t("shareTitle")
      },
      {
        dialogTitle: I18n.t("shareDialogTitle")
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            ...styles.triangleCorner,
            borderLeftWidth: Dimensions.get("window").width
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#FF8900",
              borderRadius: 45,
              height: 75,
              width: 75,
              position: "absolute",
              bottom: -45,
              right: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.handleMail}
          >
            <TabBarIcon name="md-mail" size={40} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF8900",
              borderRadius: 45,
              height: 75,
              width: 75,
              position: "absolute",
              bottom: -60,
              right: 100,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.handleShare}
          >
            <TabBarIcon name="md-share" size={40} color="#FFF" />
          </TouchableOpacity>
          <Image
            source={require("../assets/images/icon-512.png")}
            style={{
              height: 130,
              width: 130,
              position: "absolute",
              bottom: 0,
              left: -Dimensions.get("window").width - 20
            }}
          />
          <View
            style={{
              height: 50,
              width: Dimensions.get("window").width,
              position: "absolute",
              left: -Dimensions.get("window").width + 10,
              bottom: -80
            }}
          >
            <Text style={{ fontSize: 40 }}>{I18n.t("faqShort")}:</Text>
          </View>
        </View>

        <ScrollView style={{ marginBottom: 50 }}>
          <QAs />
        </ScrollView>
      </View>
    );
  }
}

const QAs = () => {
  return (
    <React.Fragment>
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

      {/* <View style={styles.card}>
        <Text style={{ fontWeight: "bold" }}>{I18n.t("question")}:</Text>
        <Text style={styles.question}>{I18n.t("q4")}</Text>

        <Text style={{ fontWeight: "bold" }}>{I18n.t("answer")}:</Text>
        <Text style={styles.answer}>{I18n.t("a4")}</Text>
      </View> */}
    </React.Fragment>
  );
};

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
    flex: 1
  },
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff"
  },
  triangleCorner: {
    left: 0,
    height: 250,
    backgroundColor: "#0092db",
    borderStyle: "solid",
    borderBottomWidth: 80,
    borderLeftColor: "transparent",
    borderBottomColor: "white"
  }
});
