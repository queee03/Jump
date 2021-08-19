import * as Three from "three";

export default {
  backgroundColor: "#000",
  width: window.innerWidth,
  height: window.innerHeight,
  frustumSize: 30, // 视口大小
  antialias: true, // 抗锯齿
  preserveDrawingBuffer: true, // 保留缓冲区数据
  shadowMap: {
    enabled: true,
    type: Three.PCFShadowMap,
  },
  axesHelperSize: 100,
};
