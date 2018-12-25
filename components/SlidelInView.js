import React from "react";
import { Animated, View } from "react-native";

export default class SlidelInView extends React.Component {
  state = {
    anim: new Animated.Value(230) // Initial value for opacity: 0
  };

  check = () => {
    if (this.props.show) {
      Animated.spring(this.state.anim, {
        toValue: 0,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(this.state.anim, {
        toValue: 230,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver: true
      }).start();
    }
  };

  componentDidMount() {
    this.check();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.check();
    }
  }

  render() {
    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          transform: [{ translateY: this.state.anim }],
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 230,
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            position: "relative",
            width: "90%",
            height: "100%",
            backgroundColor: "#FFFFFF",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            alignItems: "center"
          }}
        >
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}
