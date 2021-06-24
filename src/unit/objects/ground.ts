import * as Three from "three";
import blockConf from "@/confs/block";
import sceneConf from "@/confs/scene";

export type GroundType = {
  instance: Three.Mesh;
};

class Ground implements GroundType {
  instance: Three.Mesh;
  constructor() {
    const geometry = new Three.PlaneGeometry(200, 200);
    const material = new Three.ShadowMaterial({
      color: "#000",
      opacity: 0.3,
      // transparent: false,
    });

    this.instance = new Three.Mesh(geometry, material);
    this.instance.rotation.x = -Math.PI / 2;
    this.instance.position.y = -blockConf.height / 2;
    this.instance.receiveShadow = true;
  }
}

export default Ground;
