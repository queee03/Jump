import * as Three from "three";
import BaseBlock from "./base";
import blockConf from "@/confs/block";
const cuboidConf = blockConf.cuboid;

class Cylinder extends BaseBlock {
  instance: Three.Mesh;
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number, width?: number) {
    super("cylinder");

    const { receiveShadow, castShadow } = blockConf;
    const { name, color } = cuboidConf;
    const size = width || this.width;
    const geometry = new Three.CylinderGeometry(
      size / 2,
      size / 2,
      this.height,
      120
    );
    const meterial = new Three.MeshPhongMaterial({ color });
    this.instance = new Three.Mesh(geometry, meterial);
    this.instance.name = name; // 为了后续重新渲染等操作
    this.instance.position.x = this.x = x;
    this.instance.position.y = this.y = y;
    this.instance.position.z = this.z = z;
    this.instance.receiveShadow = receiveShadow;
    this.instance.castShadow = castShadow;
  }
}

export default Cylinder;
