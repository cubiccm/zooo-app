/**
 * @author Alan Li
 * Camera timer
 */

import { StyleSheet, View, Text } from "react-native";

export default function CameraTimer({
  time
}: {
  time: number,
}) {
  const hours = String(Math.floor(time / 3600 / 1000)).padStart(2, '0');
  const minutes = String(Math.floor(time / 60 / 1000) % 60).padStart(2, '0');
  const seconds = String(Math.floor(time / 1000) % 60).padStart(2, '0');
  return <View style={styles.container}>
    <Text style={styles.text}>{hours}:{minutes}:{seconds}</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, .3)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 21,
    fontWeight: 600,
    color: "white",
  },
});