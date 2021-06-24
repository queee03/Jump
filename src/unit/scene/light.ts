import * as Three from "three";

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
    const ambientLight = new Three.AmbientLight("#fff", 0.8);
    const shadowLight = new Three.DirectionalLight("#f5f5f5", 0.3);
    // 设置一个不可见的shadowTarget
    const shadowTarget = new Three.Mesh(
      new Three.PlaneGeometry(0.1, 0.1),
      new Three.MeshBasicMaterial({ color: "#fff" })
    );
    shadowTarget.visible = false;
    shadowTarget.name = "shadowTarget";
    shadowLight.position.set(10, 30, 20);
    shadowLight.target = shadowTarget;

    this.instances.ambientLight = ambientLight;
    this.instances.shadowLight = shadowLight;
    this.instances.shadowTarget = shadowTarget;
    this.shadowTarget = shadowTarget;
  }
}

export default Light;
