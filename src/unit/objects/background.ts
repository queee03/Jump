import * as Three from "three";
import sceneConf from "@/confs/scene";

export type BackgroundType = {
  instance: Three.Mesh;
};

class Background implements BackgroundType {
  instance: Three.Mesh;
  constructor() {
    const geometry = new Three.PlaneGeometry(
      sceneConf.frustumSize * 2,
      (window.innerHeight / window.innerWidth) * sceneConf.frustumSize * 2
    );
    const material = new Three.MeshBasicMaterial({
      color: "#d7dbe6",
      opacity: 1,
    });

    this.instance = new Three.Mesh(geometry, material);
    this.instance.position.z = -84; // ?
  }
}

export default Background;
