import blockConf from "./block";

import headImg from "@/assets/images/head.png";
// import topImg from "@/assets/images/top.png";
import middleImg from "@/assets/images/top.png";
import bottomImg from "@/assets/images/bottom.png";

export type DirectionEnum = 0 | 1; // 0:延x轴跳跃 1:y
export type AxisEnum = "x" | "y" | "z" | undefined;
export type StatusEnum = "stop" | "shrink";

const castShadow = true;
const initScale = 1;

const height = 11; // 总高度 改变此数值则可按比例缩放
const horizon = blockConf.height / 2 + blockConf.initPosition.y;

const startPositionY = 0;
const initPositionY = startPositionY + 30;
const segments = 20;

const headH = height * 0.34;
const bodyTopH = height * 0.1;
const bodyMiddleH = height * 0.1;
const bodyBottomH = height * 0.4;
const span = height * 0.06; // 头部与身体的间隙
const radius = (headH * 0.8) / 2; // 核心半径 因为头部宽高相等，所以用头部高度作为核心直径

const rotateScale = 1.4;
/* 
  以 horizon 为相对0点，obj的Y轴中心在0点，但bottle整体可视部分在0点以上
*/
export default {
  name: "bottle",
  materialColor: "#800080",
  horizon,
  initScale,
  initStatus: <const>"stop",
  initPosition: {
    x: blockConf.initPosition.x,
    y: horizon + initPositionY,
    z: 0,
  },
  startPosition: {
    x: blockConf.initPosition.x,
    y: horizon + startPositionY,
    z: 0,
  },
  texture: {
    specular: headImg,
    middle: middleImg,
    bottom: bottomImg,
  },
  head: {
    // 实际高度：headH
    radius: headH / 2,
    positionY: bodyBottomH + bodyMiddleH + bodyTopH + span + headH / 2,
    rotateRate: 0.06,
    castShadow,
  },
  bodyTop: {
    // 实际高度：bodyTopH * 2
    // 但由于本身这个椭圆需要隐藏一半高度 所以实际视觉效果高度就是 bodyTopH
    radius: radius,
    scaleY: bodyTopH / radius, // radius * scaleY = bodyTopH * 2
    segments,
    positionY: bodyBottomH + bodyMiddleH,
    castShadow,
  },
  bodyMiddle: {
    height: bodyMiddleH,
    topRadius: radius,
    bottomRadius: radius * 0.9,
    segments,
    positionY: bodyBottomH + bodyMiddleH / 2,
    castShadow,
  },
  bodyBottom: {
    height: bodyBottomH,
    topRadius: radius * 0.9,
    bottomRadius: radius * 1.2,
    positionY: bodyBottomH / 2,
    segments,
    castShadow,
  },
  showup: {
    duration: 0.5,
    type: <const>"BounceEaseOut",
  },
  shrink: {
    minScale: 0.55,
    horizonDeltaScale: 0.007,
    deltaScale: 0.005,
    headDelta: 0.03,
  },
  rebound: {
    // {
    //   unit: <const>"head",
    //   attribute: <const>"position",
    //   duration: 0.1,
    //   x: 0.45 * rotateScale,
    //   y: 0.9 * rotateScale,
    // },
    // {
    //   unit: <const>"head",
    //   attribute: <const>"position",
    //   duration: 0.1,
    //   delay: 0.1,
    //   x: -0.45 * rotateScale,
    //   y: -0.9 * rotateScale,
    // },
    headAnimation: {
      duration: 0.15,
      // delay: 0.25,
      to: {
        x: 0,
        y: bodyBottomH + bodyMiddleH + bodyTopH + span + headH / 2,
      },
    },
    // {
    //   unit: <const>"body",
    //   attribute: <const>"scale",
    //   duration: 0.1,
    //   abX: Math.max(Math.min(1 / rotateScale, 1), 0.7),
    //   abY: Math.max(rotateScale, 1),
    //   abZ: Math.max(Math.min(1 / rotateScale, 1), 0.7),
    // },
    // {
    //   unit: <const>"body",
    //   attribute: <const>"scale",
    //   duration: 1,
    //   delay: 0.1,
    //   abX: Math.max(rotateScale, 1.2),
    //   abY: Math.min(0.9 / rotateScale, 0.7),
    //   abZ: Math.max(rotateScale, 1.2),
    // },
    bodyAnimation: {
      duration: 0.3,
      // delay: 0.3,
      to: {
        x: initScale,
        y: initScale,
        z: initScale,
      },
    },
  },
  rotate: {
    animationType: <const>"Linear",
    animations: [
      {
        duration: 0.14,
        x: 0,
        y: 0,
        z: -Math.PI,
      },
      {
        duration: 0.18,
        delay: 0.14,
        z: -Math.PI * 2,
      },
    ],
  },
};
