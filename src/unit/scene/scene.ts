import * as Three from "three";
import Camera from "./camera";
import type { CameraType } from "./camera";
import sceneConfs from "@/confs/scene";

export type SceneType = {
  instance: Three.Scene;
  camera: CameraType;
  renderer: Three.WebGLRenderer;
  axesHelper: Three.AxesHelper;
  render: () => void;
};

class Scene implements SceneType {
  instance: Three.Scene;
  camera: CameraType;
  renderer: Three.WebGLRenderer;
  axesHelper: Three.AxesHelper;
  constructor() {
    this.renderer = new Three.WebGLRenderer({
      antialias: true, // 抗锯齿
      preserveDrawingBuffer: true, // 保留缓冲区数据
    });
    this.renderer.setSize(sceneConfs.width, sceneConfs.height);

    this.instance = new Three.Scene();
    this.camera = new Camera();
    this.axesHelper = new Three.AxesHelper(100);

    this.instance.add(this.axesHelper);
    // this.instance.add(this.camera.instance);
  }
  render() {
    this.renderer.render(this.instance, this.camera.instance);
  }
}

export default Scene;
