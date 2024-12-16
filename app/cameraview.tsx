/**
 * @author Alan Li
 * Camera view
 */

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { useRef } from "react";
import RecordingButton from "./recordingbutton";

export default function CameraView() {
  const device = useCameraDevice("back");
  const camera = useRef(null as null | Camera);

  if (device == null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Unable to access camera</Text>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        video={true}
        audio={true}
        ref={camera}
      />
      <SafeAreaView style={styles.container}>
        <RecordingButton
          onRecordingStart={() => {
            camera.current?.startRecording({
              onRecordingFinished: (video) => console.log(video),
              onRecordingError: (error) => console.error(error),
            });
          }}
          onRecordingEnd={() => {
            camera.current?.stopRecording();
          }}
        ></RecordingButton>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
});
