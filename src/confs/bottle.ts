import blockConf from "./block";

const height = 10; // 总高度 改变此数值则可按比例缩放

const positionY = 0;
const segments = 20;

const headH = height * 0.34;
const bodyTopH = height * 0.1;
const bodyMiddleH = height * 0.1;
const bodyBottomH = height * 0.4;
const span = height * 0.06; // 头部与身体的间隙
const radius = headH / 2; // radius为半径

export default {
  name: "bottle",
  materialColor: "#800080",
  initPosition: {
    x: -15,
    y: blockConf.height / 2 + positionY,
    z: 0,
  },
  head: {
    // 实际高度：headH
    radius: radius,
    positionY: bodyBottomH + bodyMiddleH + bodyTopH + span + headH / 2,
  },
  bodyTop: {
    // 实际高度：bodyTopH * 2
    // 但由于本身这个椭圆需要隐藏一半高度 所以实际视觉效果高度就是 bodyTopH
    radius: radius, // radius为半径
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
    bottomRadius: radius * 1.5,
    positionY: bodyBottomH / 2,
    segments,
  },
};