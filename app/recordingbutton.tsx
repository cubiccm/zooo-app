/**
 * @author Alan Li
 * Camera recording button
 */

import { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  useAnimatedValue,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function RecordingButton({
  onRecordingStart,
  onRecordingEnd,
}: {
  onRecordingStart: () => void;
  onRecordingEnd: () => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const animation_progress = useRef(new Animated.Value(0)).current;
  const rotate_animation = Animated.loop(
    Animated.timing(animation_progress, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    })
  );

  useEffect(() => {
    if (isRecording) {
      rotate_animation.reset();
    } else {
      rotate_animation.start();
    }
  }, [isRecording]);

  const rotate_degree = animation_progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity
      onPress={() => {
        if (!isRecording) {
          setIsRecording(true);
          onRecordingStart();
        } else {
          setIsRecording(false);
          onRecordingEnd();
        }
      }}
      style={styles.container}
    >
      <Animated.View
        style={[
          isRecording ? styles.contentRecording : styles.content,
          {
            transform: [{ rotate: rotate_degree }],
          },
        ]}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={isRecording ? styles.contentRecording : styles.content}
          colors={["#ff2372", "#ce428d", "#a45cff"]}
        ></LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    bottom: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  content: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  contentRecording: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 8,
  }
});
