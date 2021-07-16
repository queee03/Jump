import bottle from "@/confs/bottle";
import * as Three from "three";
import bottleConf from "@/confs/bottle";

export type BottleType = {
  obj: Three.Object3D;
  bottle: Three.Object3D;
};

class Bottle implements BottleType {
  obj: Three.Object3D;
  bottle: Three.Object3D;
  constructor() {
    const { initPosition } = bottleConf;
    this.obj = new Three.Object3D();
    this.obj.name = "bottle";
    this.obj.position.set(initPosition.x, initPosition.y, initPosition.z);
    this.bottle = new Three.Object3D();
  }
}

export default Bottle;
