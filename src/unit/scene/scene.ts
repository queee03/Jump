import * as Three from "three";
import Camera from "./camera";
import type { CameraType } from "./camera";
import Light from "./light";
import type { LightType } from "./light";
import sceneConfs from "@/confs/scene";

export type SceneType = {
  instance: Three.Scene;
  camera: CameraType;
  light: LightType;
  renderer: Three.WebGLRenderer;
  axesHelper: Three.AxesHelper;
  render: () => void;
};

class Scene implements SceneType {
  instance: Three.Scene;
  camera: CameraType;
  light: LightType;
  renderer: Three.WebGLRenderer;
  axesHelper: Three.AxesHelper;
  constructor() {
    // define
    this.renderer = new Three.WebGLRenderer({
      antialias: true, // 抗锯齿
      preserveDrawingBuffer: true, // 保留缓冲区数据
    });
    this.renderer.setSize(sceneConfs.width, sceneConfs.height);
    this.instance = new Three.Scene();
    this.camera = new Camera();
    this.light = new Light();
    this.axesHelper = new Three.AxesHelper(100);
    // add
    this.instance.add(this.axesHelper);
    this.instance.add(this.camera.instance);
    for (let key in this.light.instances) {
      this.instance.add(this.light.instances[key]);
    }
  }
  render() {
    this.renderer.render(this.instance, this.camera.instance);
  }
}

export default Scene;
