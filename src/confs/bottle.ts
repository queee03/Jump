const segments = 20;
const radius = 2;
const positionY = radius * 2;
export default {
  name: "bottle",
  initPosition: {
    x: -15,
    y: 10,
    z: 0,
  },
  materialColor: "#800080",
  positionY,
  headRadius: radius,
  headRPositionY: radius * 3,
  bodyBottom: {
    topRadius: 0.6 * radius,
    bottomRadius: 0.9 * radius,
    height: 1.9 * radius,
    segments,
  },
  bodyMiddle: {
    topRadius: radius / 1.4,
    bottomRadius: radius / 1.5,
    height: 1.2 * radius,
    segments,
    positionY: radius / 1.4,
  },
  bodyTop: {
    radius: radius / 1.4,
    scaleY: 0.5,
    segments,
    positionY: 1.32 * radius,
  },
};
