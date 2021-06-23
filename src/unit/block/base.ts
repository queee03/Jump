import blockConfs from "@/confs/block";

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
    this.height = blockConfs.height;
    this.width = blockConfs.width;
  }
}
export default BaseBlock;
