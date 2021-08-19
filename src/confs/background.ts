import sceneConf from "@/confs/scene";

export default {
  width: sceneConf.frustumSize * 2,
  height: (window.innerHeight / window.innerWidth) * sceneConf.frustumSize * 2,
  color: "#d7dbe6",
  opacity: 1,
  position: {
    z: -84, //?
  },
};
