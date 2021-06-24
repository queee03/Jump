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
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = Three.PCFShadowMap;

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
    this.camera.instance.add(this.background.instance); // 注意：是往 camera 中 add, 被添加的单元会以 camera 的坐标系为准 (相对 scene 是斜面)
    /* ?为什么 background 跟 ground 添加的方式不一样? 
        因为 ground 相当于地面,需要用于投射阴影,所以必须把它放在场景中,相对场景中的物体平行
        而此处的 background 跟物体并无实际交互,只需要相对 camera 的角度平行即可
    */
  }
  render() {
    this.renderer.render(this.instance, this.camera.instance);
  }
}

export default Scene;
