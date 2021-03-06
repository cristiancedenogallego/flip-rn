import * as React from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, View } from 'react-native';

export interface CardProps {
  frontImage: string;
  backImage: string;
  x: Animated.Value
}

const { width } = Dimensions.get("window");

const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
  
  const {frontImage, backImage, x} = props;
  const rotateY = x.interpolate({
    inputRange: [0, width],
    outputRange: ['0deg', "180deg"]
  })

  const frontOpacity = x.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0]
  })
  
  const backOpacity = x.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1]
  })

  const perspective = 1000;


  return (
      <View style={styles.container}>
        <Animated.View
          style={[{
            ...StyleSheet.absoluteFillObject,
            opacity: frontOpacity,
            backfaceVisibility: "hidden",
            transform: [
              { perspective },
              { rotateY }
            ]
          }]}
        >
          <Image source={{ uri: frontImage }} style={styles.image}></Image>
        </Animated.View>
        <Animated.View
          style={[ {
            ...StyleSheet.absoluteFillObject,
            opacity: backOpacity,
            backfaceVisibility: "hidden",
            transform: [
              { rotateY: "180deg" },
              { perspective },
              { rotateY }
            ]
          }]}
        >
          <Image source={{ uri: backImage }} style={styles.image}></Image>
        </Animated.View>
      </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    aspectRatio: 0.6,
  }
})
 
export default Card;