export type typeEnum = "cuboid" | "cylinder";
export type StatusEnum = "stop" | "shrink";

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
  initScale: 1,
  initPosition: {
    x: -15,
    y: 0,
    z: 0,
  },
  shrink: {
    minScale: 0.55,
    deltaScale: 0.005,
  },
};
