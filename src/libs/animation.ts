/* 
    @description animation library
    @detail requestAnimationFrame
    1. duration
    2. from
    3. to
    4. type
*/

/// <reference path="animation.d.ts"/>
import A = Animation;
import Tween from "./tween";

const frameInterval = 17; // 帧间隔时间ms 对于人眼已经够用

const customAnimation: A.CustomAnimationType = {};
customAnimation.to = function (duration, from, to, type) {};

const TweenAnimation: A.TweenAnimationType = function (
  from,
  to,
  duration = 300, // second
  type = "Linear",
  callback = () => {}
) {
  const framaCount = (duration * 1000) / frameInterval; // 帧数
  let start = -1; // 记录当前帧数，非实际值
  const startTime = Date.now();
  let lastTime = Date.now();

  const tween = Tween[type];

  // 绘制 调用一次绘制一帧
  const step = function () {
    /* 
        要求：
        1. 利用 requestAnimationFrame 
        2. 按照自定义的时间间隔 frameInterval 绘制动画
        问题：
        但 requestAnimationFrame 刷新的时间间隔一般与浏览器的刷新频率相同，并不能自定义，
        所以要做相应计算以控制
    */
    const currentTime = Date.now();
    const interval = currentTime - lastTime;
    lastTime = Date.now();

    /* 
        如果刷新频率与自定义频率相等或更快，则正常绘制下一帧；
        如果比自定义频率慢，则需要跳帧
    */
    if (interval <= frameInterval) {
      start++;
    } else {
      // 计算出跳了几帧
      const _start = Math.floor(interval / frameInterval);
      start += _start;
    }

    // const value = tween(start, from, to - from, framaCount);
    tween();

    if (start <= framaCount) {
      // 动画继续
      // callback(value);
      requestAnimationFrame(step);
    } else {
      // 动画结束
      callback(to, true);
    }
  };

  step();
};

export default customAnimation;
