import * as Three from "three";
import BaseBlock from "./base";
import blockConf, { cuboid as cuboidConf } from "@/confs/block";

class Cuboid extends BaseBlock {
  constructor(x: number, y: number, z: number, width?: number) {
    super("cuboid", x, y, z);

    const { receiveShadow, castShadow } = blockConf;
    const { name, color } = cuboidConf;
    const size = width || this.width;
    const geometry = new Three.BoxGeometry(size, this.height, size);
    const meterial = new Three.MeshPhongMaterial({ color });

    const block = new Three.Mesh(geometry, meterial);
    block.name = name; // 为了后续重新渲染等操作
    block.position.y = this.height / 2; // position是相对于instance的
    block.receiveShadow = receiveShadow;
    block.castShadow = castShadow;
    this.init(block);
  }
}

export default Cuboid;
