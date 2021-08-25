import * as Three from "three";
import BaseBlock from "./base";
import blockConf, { cylinder as cylinderConf } from "@/confs/block";

class Cylinder extends BaseBlock {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number, width?: number) {
    super("cylinder");

    const { receiveShadow, castShadow } = blockConf;
    const { name, color } = cylinderConf;
    const size = width || this.width;
    const geometry = new Three.CylinderGeometry(
      size / 2,
      size / 2,
      this.height,
      120
    );
    const meterial = new Three.MeshPhongMaterial({ color });

    const block = new Three.Mesh(geometry, meterial);
    block.name = name;
    block.position.y = this.height / 2;
    block.receiveShadow = receiveShadow;
    block.castShadow = castShadow;

    this.instance.position.x = this.x = x;
    this.instance.position.z = this.z = z;
    this.y = y;
    const instanceY = this.y - this.height / 2;
    this.instance.position.y = instanceY;
    this.instance.add(block);
  }
}

export default Cylinder;
