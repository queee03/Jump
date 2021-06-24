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
  shadowTarget;
  constructor() {
    const ambientLight = new Three.AmbientLight("#fff", 0.8);
    const shadowLight = new Three.DirectionalLight("#f5f5f5", 0.3);
    shadowLight.position.set(10, 30, 20);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.near = 0.5;
    shadowLight.shadow.camera.far = 500;
    shadowLight.shadow.camera.left = -100;
    shadowLight.shadow.camera.right = 100;
    shadowLight.shadow.camera.top = 100;
    shadowLight.shadow.camera.bottom = -100;
    shadowLight.shadow.mapSize.width = 1024;
    shadowLight.shadow.mapSize.height = 1024;
    // 设置一个不可见的shadowTarget
    const shadowTarget = new Three.Mesh(
      new Three.PlaneGeometry(0.1, 0.1),
      new Three.MeshBasicMaterial({ color: "#fff" })
    );
    shadowTarget.visible = false;
    shadowTarget.name = "shadowTarget";
    shadowLight.target = shadowTarget;

    this.instances.ambientLight = ambientLight;
    this.instances.shadowLight = shadowLight;
    this.instances.shadowTarget = shadowTarget;
    this.shadowTarget = shadowTarget;
  }
}

export default Light;
