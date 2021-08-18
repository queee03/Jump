declare namespace Tween {
  type EasingEnum = "Linear";

  type TweenFunctionType = (
    currentFrame: number, // 当前帧
    from: number,
    range: number, // from 和 to 之间的间隔
    totalFrameCount: number // 总帧数
  ) => number;

  type TweenType = Record<EasingEnum, TweenFunctionType>;
}
