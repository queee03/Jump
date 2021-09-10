import * as Three from "three";
export type DirectionEnum = 0 | 1; // 0:延x轴跳跃 1:z
// export type AxisEnum = "x" | "y" | "z" | undefined;
export type AxisType = Three.Vector3;
export type PositionKeyEnum = "x" | "y" | "z";
export type PositionType = Record<PositionKeyEnum, number>;

export default {
  gravity: 700, // 和场景的数量级和坐标体系相关，不是物理体系的数值
  initDirection: <const>0,
};
