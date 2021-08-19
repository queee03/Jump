import * as Three from "three";
import cameraConf from "@/confs/camera";

export type CameraType = {
  instance: Three.OrthographicCamera;
  target: Three.Vector3;
};

class Camera implements CameraType {
  instance;
  target;
  constructor() {
    const {
      position,
      orthographic: { left, right, top, bottom, near, far },
      target,
    } = cameraConf;
    this.instance = new Three.OrthographicCamera(
      left,
      right,
      top,
      bottom,
      near,
      far
    );

    // this.instance.position.set(-10, 10, 10);
    this.instance.position.set(position.x, position.y, position.z);
    this.target = new Three.Vector3(target.x, target.y, target.z);
    this.instance.lookAt(this.target);
  }
}

export default Camera;
