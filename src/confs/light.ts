import * as Three from "three";

export default {
  ambient: {
    color: "#fff",
    intensity: 0.8, // 强度
  },
  shadow: {
    color: "#f5f5f5",
    intensity: 0.3,
    position: {
      x: 10,
      y: 30,
      z: 20,
    },
    camera: {
      near: 0.5,
      far: 500,
      left: -100,
      right: 100,
      top: 100,
      bottom: -100,
    },
    mapSize: {
      width: 1024,
      height: 1024,
    },
    castShadow: true,
  },
  shadowTarget: {
    name: "shadowTarget",
    width: 0.1,
    height: 0.1,
    color: "#fff",
    visible: false,
  },
};
