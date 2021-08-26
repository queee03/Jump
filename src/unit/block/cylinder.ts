import * as Three from "three";
import BaseBlock from "./base";
import blockConf, { cylinder as cylinderConf } from "@/confs/block";

class Cylinder extends BaseBlock {
  constructor(x: number, y: number, z: number, width?: number) {
    super("cylinder", x, y, z);

    const { receiveShadow, castShadow } = blockConf;
    const { name, color, radialSegments } = cylinderConf;
    const size = width || this.width;
    const geometry = new Three.CylinderGeometry(
      size / 2,
      size / 2,
      this.height,
      radialSegments
    );
    const meterial = new Three.MeshPhongMaterial({ color });

    const block = new Three.Mesh(geometry, meterial);
    block.name = name;
    block.position.y = this.height / 2;
    block.receiveShadow = receiveShadow;
    block.castShadow = castShadow;
    this.init(block);
  }
}

export default Cylinder;
