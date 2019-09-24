import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default props => {
  return (
    <View style={styles.container}>
      <View style={styles.box}></View>
      <View style={styles.box2}></View>
      <Text style={styles.text}>Henlo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4f4fbc"
  },
  box: {
    backgroundColor: "#00bcbc",
    width: width / 2 + 40,
    height: height / 2,
    position: "absolute",
    top: height / 2 - 50,
    left: width / 2 - 70,
    borderRadius: 30,
    opacity: 0.5
  },
  box2: {
    backgroundColor: "#bcbc00",
    width: width / 2 + 40,
    height: height / 2 - 20,
    position: "absolute",
    top: 20 + 50,
    left: 30,
    borderRadius: 30,
    opacity: 0.5
  },
  text: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold"
  }
});
