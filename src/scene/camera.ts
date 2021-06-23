import * as Three from "three";
import sceneConfs from "@/confs/scene";

export type CameraType = {
  instance: Three.OrthographicCamera;
  target: Three.Vector3;
};

class Camera implements CameraType {
  instance: Three.OrthographicCamera;
  target: Three.Vector3;
  constructor() {
    const aspect = sceneConfs.height / sceneConfs.width;
    const frustumSize = sceneConfs.frustumSize;
    this.instance = new Three.OrthographicCamera(
      -frustumSize,
      frustumSize,
      frustumSize * aspect,
      -frustumSize * aspect,
      -100,
      100
    );

    this.instance.position.set(-10, 10, 10);
    this.target = new Three.Vector3(0, 0, 0);
    this.instance.lookAt(this.target);
  }
}

export default Camera;
