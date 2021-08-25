import * as Three from "three";
import BaseBlock from "./base";
import blockConf, { cuboid as cuboidConf } from "@/confs/block";

class Cuboid extends BaseBlock {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number, width?: number) {
    super("cuboid");

    const { receiveShadow, castShadow } = blockConf;
    const { name, color } = cuboidConf;
    const size = width || this.width;
    const geometry = new Three.BoxGeometry(size, this.height, size);
    const meterial = new Three.MeshPhongMaterial({ color });

    /* 
      block 是肉眼可见的实体，中心在正中央；
      instance 是不可见的透明 Object ，Y轴方向的中心在 block 的底面
      输出的是 instance ，这样做的好处是方便控制压缩动画
    */
    const block = new Three.Mesh(geometry, meterial);
    block.name = name; // 为了后续重新渲染等操作
    block.position.y = this.height / 2; // position是相对于instance的
    block.receiveShadow = receiveShadow;
    block.castShadow = castShadow;

    this.instance.position.x = this.x = x;
    this.instance.position.z = this.z = z;
    this.y = y; // position.y对外依然保持为block中心，看后续操作需不需要优化
    const instanceY = this.y - this.height / 2;
    this.instance.position.y = instanceY;
    this.instance.add(block);
  }
}

export default Cuboid;
