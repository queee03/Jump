import blockConf from "@/confs/block";

export default {
  width: 200,
  height: 200,
  color: "#000",
  opacity: 0.3,
  rotation: {
    x: -Math.PI / 2,
  },
  position: {
    y: -blockConf.height / 2,
  },
  receiveShadow: true,
};
