import sceneConf from "@/confs/scene";
const aspect = sceneConf.height / sceneConf.width;
const frustumSize = sceneConf.frustumSize;

export default {
  position: {
    x: 0,
    y: 0,
    // x: -10,
    // y: 10,
    z: 10,
  },
  orthographic: {
    left: -frustumSize,
    right: frustumSize,
    top: frustumSize * aspect,
    bottom: -frustumSize * aspect,
    near: -100,
    far: 100,
  },
  target: {
    x: 0,
    y: 0,
    z: 0,
  },
};
