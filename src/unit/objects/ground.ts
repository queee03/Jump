import * as Three from "three";
import groundConf from "@/confs/ground";

export type GroundType = {
  instance: Three.Mesh;
};

class Ground implements GroundType {
  instance: Three.Mesh;
  constructor() {
    const { width, height, color, opacity, rotation, position, receiveShadow } =
      groundConf;

    const geometry = new Three.PlaneGeometry(width, height);
    const material = new Three.ShadowMaterial({
      color,
      opacity,
      // transparent: false,
    });

    this.instance = new Three.Mesh(geometry, material);
    this.instance.rotation.x = rotation.x;
    this.instance.position.y = position.y;
    this.instance.receiveShadow = receiveShadow;
  }
}

export default Ground;
