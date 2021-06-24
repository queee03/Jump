export default {
  backgroundColor: "#000",
  width: window.innerWidth,
  height: window.innerHeight,
  frustumSize: 30, // 视口大小
  ambientLight: {
    color: "#fff",
    opacity: 0.8,
  },
  shadowLight: {
    color: "#f5f5f5",
    opacity: 0.3,
    positions: {
      x: 10,
      y: 30,
      z: 20,
    },
  },
  shadowTarget: {
    name: "shadowTarget",
    color: "#fff",
    width: 0.1,
    height: 0.1,
  },
};
