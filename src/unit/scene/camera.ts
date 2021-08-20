import * as Three from "three";
import cameraConf from "@/confs/camera";

class Camera {
  instance: Three.OrthographicCamera;
  target: Three.Vector3;
  constructor() {
    const { position, orthographic, target } = cameraConf;
    this.instance = new Three.OrthographicCamera(
      orthographic.left,
      orthographic.right,
      orthographic.top,
      orthographic.bottom,
      orthographic.near,
      orthographic.far
    );

    // this.instance.position.set(-10, 10, 10);
    this.instance.position.set(position.x, position.y, position.z);
    this.target = new Three.Vector3(target.x, target.y, target.z);
    this.instance.lookAt(this.target);
  }
}

export default Camera;
