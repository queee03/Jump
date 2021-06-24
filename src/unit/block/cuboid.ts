import * as Three from "three";
import BaseBlock from "./base";

export type CuboidType = {
  instance: Three.Mesh;
  x: number;
  y: number;
  z: number;
};

class Cuboid extends BaseBlock implements CuboidType {
  instance: Three.Mesh;
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number, width?: number) {
    super("cuboid");
    const size = width || this.width;
    const geometry = new Three.BoxGeometry(size, this.height, size);
    const meterial = new Three.MeshPhongMaterial({ color: "#fff" });
    this.instance = new Three.Mesh(geometry, meterial);
    this.instance.name = "block"; // 为了后续重新渲染等操作
    this.instance.position.x = this.x = x;
    this.instance.position.y = this.y = y;
    this.instance.position.z = this.z = z;
  }
}

export default Cuboid;
