import * as Three from "three";
import sceneConfs from "@/confs/scene";

type lightInstanceType =
  | Three.AmbientLight
  | Three.DirectionalLight
  | Three.Mesh;
export type LightType = {
  instances: Record<string, lightInstanceType>;
  shadowTarget: Three.Mesh;
};

class Light implements LightType {
  instances: Record<string, lightInstanceType> = {};
  shadowTarget: Three.Mesh;
  constructor() {
    const ambientLight = new Three.AmbientLight(
      sceneConfs.ambientLight.color,
      sceneConfs.ambientLight.opacity
    );
    const shadowLight = new Three.DirectionalLight(
      sceneConfs.shadowLight.color,
      sceneConfs.shadowLight.opacity
    );
    // 设置一个不可见的shadowTarget
    const shadowTarget = new Three.Mesh(
      new Three.PlaneGeometry(
        sceneConfs.shadowTarget.width,
        sceneConfs.shadowTarget.height
      ),
      new Three.MeshBasicMaterial({ color: sceneConfs.shadowTarget.color })
    );
    shadowTarget.visible = false;
    shadowTarget.name = sceneConfs.shadowTarget.name;
    shadowLight.position.set(
      sceneConfs.shadowLight.positions.x,
      sceneConfs.shadowLight.positions.y,
      sceneConfs.shadowLight.positions.z
    );
    shadowLight.target = shadowTarget;

    this.instances.ambientLight = ambientLight;
    this.instances.shadowLight = shadowLight;
    this.instances.shadowTarget = shadowTarget;
    this.shadowTarget = shadowTarget;
  }
}

export default Light;
