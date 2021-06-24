import * as Three from "three";
import blockConfs from "@/confs/block";

export type GroundType = {
  instance: Three.Mesh;
};

class Ground {
  instance: Three.Mesh;
  constructor() {
    const geometry = new Three.PlaneGeometry(200, 200);
    const material = new Three.ShadowMaterial({
      color: "#000",
      opacity: 0.3,
    });

    this.instance = new Three.Mesh(geometry, material);
    this.instance.rotation.x = -Math.PI / 2;
    this.instance.position.y = -blockConfs.height;
  }
}

export default Ground;
