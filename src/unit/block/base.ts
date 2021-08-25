import * as Three from "three";
import blockConf from "@/confs/block";
import type { typeEnum, StatusEnum } from "@/confs/block";
import customAnimation from "@/libs/animation";

class BaseBlock {
  instance: Three.Object3D = new Three.Object3D();
  type: typeEnum;
  x: number;
  y: number;
  z: number;
  height: number;
  width: number;
  status: StatusEnum = blockConf.initStatus;
  scale: number = blockConf.initScale;
  constructor(type: typeEnum, x: number, y: number, z: number) {
    const { height, width } = blockConf;
    this.type = type;
    this.x = x;
    this.y = y; // position.y 对外依然保持为 block 中心，看后续操作需不需要优化
    this.z = z;
    this.height = height;
    this.width = width;
  }

  init(block: Three.Object3D) {
    /* 
      block 是肉眼可见的实体，中心在正中央；
      instance 是不可见的透明 Object ，Y轴方向的中心在 block 的底面
      输出的是 instance ，这样做的好处是方便控制压缩动画
    */
    const instanceY = this.y - this.height / 2;
    this.instance.position.y = instanceY;
    this.instance.position.x = this.x;
    this.instance.position.z = this.z;
    this.instance.add(block);
  }

  update() {
    if (this.status === "shrink") {
      this.shrinkUpdate();
    }
  }

  shrink() {
    this.status = "shrink";
  }

  rebound() {
    this.status = "stop";
    this.reboundUpdate();
  }

  shrinkUpdate() {
    console.log(1);
    const {
      shrink: { minScale, deltaScale },
    } = blockConf;

    let scale = this.scale - deltaScale;
    if (scale < minScale) return;

    this.scale = scale;
    this.instance.scale.y = this.scale;
  }

  reboundUpdate() {
    const {
      initScale,
      rebound: { animation },
    } = blockConf;
    this.scale = initScale;
    customAnimation.to(this.instance.scale, animation.to, animation.duration);
  }
}
export default BaseBlock;
