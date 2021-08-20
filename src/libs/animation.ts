/* 
    @description animation library
    @detail requestAnimationFrame
    1. duration
    2. from
    3. to
    4. type
*/

/// <reference path="animation.d.ts"/>
import A = AnimationTypes;
import Tween from "./tween";

const fps = 60;
const frameInterval = 1000 / fps; // 帧间隔时间ms 对于人眼已经够用

const to: A.ToType = function (from, to, duration, type, delay) {
  const keys = ["x", "y", "z"];
  keys.forEach((key) => {
    const prop = <A.PositionKeyEnum>key;
    setTimeout(
      () => {
        TweenAnimation(from[prop], to[prop], duration, type, (value) => {
          if (value || value === 0) from[prop] = value;
        });
      },
      delay ? delay * 1000 : 0
    );
  });
};
const customAnimation: A.CustomAnimationType = { to };

export const TweenAnimation: A.TweenAnimationType = function (
  from,
  to,
  duration = 1, // second
  type = "Linear",
  callback = () => {}
) {
  const framaCount = (duration * 1000) / frameInterval; // 帧数
  let currentFrame = -1; // 记录当前帧数，非实际值
  // const startTime = Date.now();
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
    const interval = currentTime - lastTime; // 是不稳定的值 跟浏览器当前状态有关
    lastTime = currentTime;

    // if (!interval) {
    //   requestAnimationFrame(step);
    //   return;
    // }

    /* 
          如果刷新频率与自定义频率相等或更快，则正常绘制下一帧；
          如果比自定义频率慢，则需要跳帧
      */
    if (interval <= frameInterval) {
      currentFrame += 1;
    } else {
      // 计算出跳了几帧
      const jump = Math.floor(interval / frameInterval);
      currentFrame += jump;
    }

    const value = tween(currentFrame, from, to - from, framaCount);
    if (currentFrame <= framaCount) {
      // 动画继续
      callback(value);
      requestAnimationFrame(step);
    } else {
      // 动画结束
      callback(to, true);
    }
  };

  step();
};

export default customAnimation;
