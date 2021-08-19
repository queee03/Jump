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
    const { height, width } = blockConf;
    this.type = type;
    this.height = height;
    this.width = width;
  }
}
export default BaseBlock;
