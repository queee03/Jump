import config from "@/confs/game";

// 竖直上抛运动，计算y轴方向的位移
// v0初速度 t间隔时间 g重力加速度
export const verticalThrowUp = function (
  v0: number,
  t: number,
  g = config.gravity
) {
  return v0 * t - 0.5 * g * t * t;
};
