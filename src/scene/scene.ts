// import Three from "three";
import {
  Scene as ThreeScene,
  OrthographicCamera,
  WebGLRenderer,
  AxesHelper,
} from "three";
import Camera from "./camera";
import type { CameraType } from "./camera";
import sceneConfs from "@/confs/scene";

class Scene {
  instance: ThreeScene | null;
  camera: CameraType | null;
  renderer: WebGLRenderer | null;
  axesHelper: AxesHelper | null;
  constructor() {
    this.instance = null;
    this.camera = null;
    this.renderer = null;
    this.axesHelper = null;
  }
  init() {
    this.instance = new ThreeScene();
    this.renderer = new WebGLRenderer({
      antialias: true, // 抗锯齿
      preserveDrawingBuffer: true, // 保留缓冲区数据
    });
    this.renderer.setSize(sceneConfs.width, sceneConfs.height);

    this.camera = new Camera();
    this.camera.init();

    this.axesHelper = new AxesHelper(100);

    this.instance.add(this.axesHelper);
    // this.instance.add(this.camera.instance as OrthographicCamera);
  }
  render() {
    this.renderer?.render(
      this.instance as ThreeScene,
      this.camera?.instance as OrthographicCamera
    );
  }
}

export default Scene;
