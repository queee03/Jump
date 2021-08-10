import blockConf from "./block";

import headImg from "@/assets/images/head.png";
// import topImg from "@/assets/images/top.png";
import middleImg from "@/assets/images/top.png";
import bottomImg from "@/assets/images/bottom.png";

const height = 11; // 总高度 改变此数值则可按比例缩放

const positionY = 0;
const segments = 20;

const headH = height * 0.34;
const bodyTopH = height * 0.1;
const bodyMiddleH = height * 0.1;
const bodyBottomH = height * 0.4;
const span = height * 0.06; // 头部与身体的间隙
const radius = (headH * 0.8) / 2; // 核心半径 因为头部宽高相等，所以用头部高度作为核心直径

export default {
  name: "bottle",
  materialColor: "#800080",
  initPosition: {
    x: -15,
    y: blockConf.height / 2 + positionY,
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
  },
  bodyTop: {
    // 实际高度：bodyTopH * 2
    // 但由于本身这个椭圆需要隐藏一半高度 所以实际视觉效果高度就是 bodyTopH
    radius: radius,
    scaleY: bodyTopH / radius, // radius * scaleY = bodyTopH * 2
    segments,
    positionY: bodyBottomH + bodyMiddleH,
  },
  bodyMiddle: {
    height: bodyMiddleH,
    topRadius: radius,
    bottomRadius: radius * 0.9,
    segments,
    positionY: bodyBottomH + bodyMiddleH / 2,
  },
  bodyBottom: {
    height: bodyBottomH,
    topRadius: radius * 0.9,
    bottomRadius: radius * 1.2,
    positionY: bodyBottomH / 2,
    segments,
  },
};
