/// <reference path="tween.d.ts"/>
import T = Tween;

/* 
    from: 初始坐标值
    range: 初始坐标值与目标坐标值的差额
    注意，from 和 range不会随动画进行而改变，是固定的
*/
const linear: T.TweenFunctionType = function (
  currentFrame,
  from,
  range,
  totalFrameCount
) {
  return from + (range * currentFrame) / totalFrameCount;
};

const Tween: T.TweenType = {
  Linear: linear,
};

export default Tween;
