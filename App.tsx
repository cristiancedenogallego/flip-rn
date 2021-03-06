import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import Card from "./components/Card";

const { width } = Dimensions.get("window");

export default function App() {
  const x = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Card
        x={x}
        frontImage="https://picsum.photos/200/300"
        backImage="https://picsum.photos/300"
      ></Card>
      <Animated.ScrollView
        pagingEnabled
        style={StyleSheet.absoluteFill}
        horizontal
        scrollEventThrottle={1}
        contentContainerStyle={{
          width: width * 2,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
      ></Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
