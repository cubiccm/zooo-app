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
import { useEffect, useRef, useState } from "react";
import RecordingButton from "./recordingbutton";
import CameraTimer from "./cameratimer";

let recording_start_time = 0;

export default function CameraView() {
  const device = useCameraDevice("back");
  const camera = useRef(null as null | Camera);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

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

  useEffect(() => {
    setInterval(() => {
      setTimeElapsed(new Date().getTime() - recording_start_time);
    }, 100);
  }, []);

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
        {isRecording && <CameraTimer time={timeElapsed}></CameraTimer>}
        <RecordingButton
          onRecordingStart={() => {
            recording_start_time = new Date().getTime();
            setTimeElapsed(0);
            setIsRecording(true);
            camera.current?.startRecording({
              onRecordingFinished: (video) => console.log(video),
              onRecordingError: (error) => console.error(error),
            });
          }}
          onRecordingEnd={() => {
            setIsRecording(false);
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
