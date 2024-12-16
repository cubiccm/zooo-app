/**
 * @author Alan Li
 * Permission overlay
 */

import { BlurView } from "expo-blur";
import { openSettings } from "expo-linking";
import { useState } from "react";
import { Text, StyleSheet, Button } from "react-native";
import {
  useCameraPermission,
  useLocationPermission,
  useMicrophonePermission,
} from "react-native-vision-camera";

export default function PermissionView() {
  const [is_permission_denied, setIsPermissionDenied] = useState(false);
  const {
    hasPermission: has_camera_permission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const {
    hasPermission: has_microphone_permission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();
  const {
    hasPermission: has_location_permission,
    requestPermission: requestLocationPermission,
  } = useLocationPermission();

  if (!has_camera_permission) {
    requestCameraPermission().then((result) => {
      if (result == false) {
        setIsPermissionDenied(true);
      }
    });
  }

  if (!has_microphone_permission) {
    requestMicrophonePermission().then((result) => {
      if (result == false) {
        setIsPermissionDenied(true);
      }
    });
  }

  if (!has_location_permission) {
    requestLocationPermission().then((result) => {
      if (result == false) {
        setIsPermissionDenied(true);
      }
    });
  }

  if (
    has_camera_permission &&
    has_microphone_permission &&
    has_location_permission
  ) {
    return <></>;
  }

  return (
    <BlurView style={styles.container} intensity={80}>
      <Text style={styles.permissionEmoji}>
        {is_permission_denied ? "🙈" : "🐵"}
      </Text>
      {is_permission_denied && (
        <>
          <Text style={styles.permissionText}>
            Zooo is unable to access your{" "}
            {!has_camera_permission
              ? "camera"
              : !has_microphone_permission
              ? "microphone"
              : "location"}
          </Text>
          <Button onPress={openSettings} title="Open Settings"></Button>
        </>
      )}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  permissionEmoji: {
    fontSize: 64,
  },
  permissionText: {
    fontSize: 18,
    color: "rgba(0, 0, 0, .6)",
  },
});
