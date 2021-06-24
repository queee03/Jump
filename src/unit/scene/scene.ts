import * as Three from "three";
import Camera from "./camera";
import type { CameraType } from "./camera";
import Light from "./light";
import type { LightType } from "./light";
import Background from "@/unit/objects/background";
import type { BackgroundType } from "@/unit/objects/background";
import sceneConf from "@/confs/scene";

export type SceneType = {
  instance: Three.Scene;
  camera: CameraType;
  light: LightType;
  background: BackgroundType;
  axesHelper: Three.AxesHelper;
  renderer: Three.WebGLRenderer;
  render: () => void;
};

class Scene implements SceneType {
  instance;
  camera;
  light;
  background;
  axesHelper;
  renderer;
  constructor() {
    // define
    this.renderer = new Three.WebGLRenderer({
      antialias: true, // 抗锯齿
      preserveDrawingBuffer: true, // 保留缓冲区数据
    });
    this.renderer.setSize(sceneConf.width, sceneConf.height);
    this.instance = new Three.Scene();
    this.camera = new Camera();
    this.light = new Light();
    this.background = new Background();
    this.axesHelper = new Three.AxesHelper(100);
    // add
    this.instance.add(this.axesHelper);
    this.instance.add(this.camera.instance);
    for (let key in this.light.instances) {
      this.instance.add(this.light.instances[key]);
    }
    this.camera.instance.add(this.background.instance); // 注意：是往camera中add ?为什么跟ground不一样
  }
  render() {
    this.renderer.render(this.instance, this.camera.instance);
  }
}

export default Scene;
