import * as Three from "three";
import blockConf from "@/confs/block";
import type { typeEnum, StatusEnum } from "@/confs/block";

class BaseBlock {
  instance: Three.Object3D = new Three.Object3D();
  type: typeEnum;
  height: number;
  width: number;
  status: StatusEnum = blockConf.initStatus;
  scale: number = blockConf.initScale;
  constructor(type: typeEnum) {
    const { height, width } = blockConf;
    this.type = type;
    this.height = height;
    this.width = width;
  }

  update() {
    if (this.status === "shrink") {
      this.shrinkUpdate();
    }
  }

  shrink() {
    this.status = "shrink";
  }

  stop() {
    this.status = "stop";
    this.shrinkInit();
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

  shrinkInit() {
    const { initScale } = blockConf;
    this.scale = initScale;
  }
}
export default BaseBlock;
