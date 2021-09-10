/// <reference path="tween.d.ts"/>
import T = TweenTypes;

/* 
    from: 初始坐标值
    range: 初始坐标值与目标坐标值的差额
    注意，from 和 range不会随动画进行而改变，是固定的
*/
const linear: T.TweenFunctionType = function (
  currentFrame, // t
  from, // b
  range, // c
  totalFrameCount // d
) {
  return from + (range * currentFrame) / totalFrameCount;
};

const bounceEaseOut: T.TweenFunctionType = function (t, b, c, d) {
  if ((t /= d) < 1 / 2.75) {
    return c * (7.5625 * t * t) + b;
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
  } else {
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
  }
};

const Tween: T.TweenType = {
  Linear: linear,
  BounceEaseOut: bounceEaseOut,
};

export default Tween;
