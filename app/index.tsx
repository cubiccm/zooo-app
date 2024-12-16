/**
 * @author Alan Li
 * Zooo app index view
 */

import {
  useCameraPermission,
} from "react-native-vision-camera";
import PermissionView from "./permissionview";
import CameraView from "./cameraview";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

/**
 * Shows camera view when camera permission is granted.
 * If there are other permission to be granted, the permission overlay
 * will appear on top of camera view.
 */
export default function Index() {
  const { hasPermission: has_camera_permission } = useCameraPermission();
  const [show_camera, setShowCamera] = useState(false);

  useEffect(() => {
    if (has_camera_permission) {
      setShowCamera(true);
    } else {
      setShowCamera(false);
    }
  }, [has_camera_permission]);

  return (
    <View style={StyleSheet.absoluteFill}>
      {show_camera && <CameraView></CameraView>}
      <PermissionView></PermissionView>
    </View>
  );
}
