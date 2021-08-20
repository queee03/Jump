import blockConf from "@/confs/block";

type typeEnum = "cuboid" | "cylinder";

class BaseBlock {
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
