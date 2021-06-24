import blockConf from "@/confs/block";

type typeEnum = "cuboid" | "cylinder";
export type BaseBlockType = {
  type: typeEnum;
  height: number;
  width: number;
};

class BaseBlock implements BaseBlockType {
  type: typeEnum;
  height: number;
  width: number;
  constructor(type: typeEnum) {
    this.type = type;
    this.height = blockConf.height;
    this.width = blockConf.width;
  }
}
export default BaseBlock;
