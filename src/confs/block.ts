export type typeEnum = "cuboid" | "cylinder";
export type StatusEnum = "stop" | "shrink";

const initScale = 1;
const initPosition = {
  x: -15,
  y: 0,
  z: 0,
};

export const cuboid = {
  name: "block",
  color: "#fff",
};

export const cylinder = {
  name: "block",
  color: "#fff",
};

export default {
  height: 10,
  width: 16,
  receiveShadow: true,
  castShadow: true,
  initStatus: <const>"stop",
  initScale,
  initPosition,
  shrink: {
    minScale: 0.55,
    deltaScale: 0.005,
  },
  rebound: {
    animation: {
      to: { x: initScale, y: initScale, z: initScale },
      duration: 0.5,
    },
  },
};
