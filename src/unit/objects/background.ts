import * as Three from "three";
import backgroundConf from "@/confs/background";

class Background {
  instance: Three.Mesh;
  constructor() {
    const { width, height, color, opacity, position } = backgroundConf;

    const geometry = new Three.PlaneGeometry(width, height);
    const material = new Three.MeshBasicMaterial({
      color,
      opacity,
    });

    this.instance = new Three.Mesh(geometry, material);
    this.instance.position.z = position.z;
  }
}

export default Background;
