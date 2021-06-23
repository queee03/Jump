import { OrthographicCamera, Vector3 } from "three";
import sceneConfs from "@/confs/scene";

export type CameraType = {
  instance: OrthographicCamera | null;
  target: Vector3 | null;
  init: () => void;
};

class Camera implements CameraType {
  instance: OrthographicCamera | null;
  target: Vector3 | null;
  constructor() {
    this.instance = null;
    this.target = null;
  }
  init() {
    const aspect = sceneConfs.height / sceneConfs.width;
    const frustumSize = sceneConfs.frustumSize;
    this.instance = new OrthographicCamera(
      -frustumSize,
      frustumSize,
      frustumSize * aspect,
      -frustumSize * aspect,
      -100,
      100
    );

    this.instance.position.set(-10, 10, 10);
    this.target = new Vector3(0, 0, 0);
    this.instance.lookAt(this.target);
  }
}

export default Camera;
