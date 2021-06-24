import * as Three from "three";
import BaseBlock from "./base";

export type CylinderType = {
  instance: Three.Mesh;
  x: number;
  y: number;
  z: number;
};

class Cylinder extends BaseBlock implements CylinderType {
  instance: Three.Mesh;
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number, width?: number) {
    super("cylinder");
    const size = width || this.width;
    const geometry = new Three.CylinderGeometry(
      size / 2,
      size / 2,
      this.height,
      120
    );
    const meterial = new Three.MeshPhongMaterial({ color: "#fff" });
    this.instance = new Three.Mesh(geometry, meterial);
    this.instance.name = "block"; // 为了后续重新渲染等操作
    this.instance.position.x = this.x = x;
    this.instance.position.y = this.y = y;
    this.instance.position.z = this.z = z;
    this.instance.receiveShadow = true;
    this.instance.castShadow = true;
  }
}

export default Cylinder;
