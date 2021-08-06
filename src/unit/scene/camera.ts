import * as Three from "three";
import sceneConf from "@/confs/scene";

export type CameraType = {
  instance: Three.OrthographicCamera;
  target: Three.Vector3;
};

class Camera implements CameraType {
  instance;
  target;
  constructor() {
    const { cameraPosition } = sceneConf;
    const aspect = sceneConf.height / sceneConf.width;
    const frustumSize = sceneConf.frustumSize;
    this.instance = new Three.OrthographicCamera(
      -frustumSize,
      frustumSize,
      frustumSize * aspect,
      -frustumSize * aspect,
      -100,
      100
    );

    // this.instance.position.set(-10, 10, 10);
    this.instance.position.set(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );
    this.target = new Three.Vector3(0, 0, 0);
    this.instance.lookAt(this.target);
  }
}

export default Camera;
