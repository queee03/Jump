import * as Three from "three";
import lightConf from "@/confs/light";

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
    const ambientLight = this.initAmbientLight();
    const shadowLight = this.initShowdowLight();
    const shadowTarget = this.initShowdowTarget(); // 不可见的shadowTarget

    shadowLight.target = shadowTarget;
    this.instances.ambientLight = ambientLight;
    this.instances.shadowLight = shadowLight;
    this.instances.shadowTarget = shadowTarget;
    this.shadowTarget = shadowTarget;
  }

  initAmbientLight() {
    const { color, intensity } = lightConf.ambient;
    const ambientLight = new Three.AmbientLight(color, intensity);
    return ambientLight;
  }

  initShowdowLight() {
    const { color, intensity, position, castShadow, camera, mapSize } =
      lightConf.shadow;

    const shadowLight = new Three.DirectionalLight(color, intensity);
    shadowLight.position.set(position.x, position.y, position.z);
    shadowLight.castShadow = castShadow;
    shadowLight.shadow.camera.near = camera.near;
    shadowLight.shadow.camera.far = camera.far;
    shadowLight.shadow.camera.left = camera.left;
    shadowLight.shadow.camera.right = camera.right;
    shadowLight.shadow.camera.top = camera.top;
    shadowLight.shadow.camera.bottom = camera.bottom;
    shadowLight.shadow.mapSize.width = mapSize.width;
    shadowLight.shadow.mapSize.height = mapSize.height;

    return shadowLight;
  }

  initShowdowTarget() {
    const { name, width, height, color, visible } = lightConf.shadowTarget;
    const shadowTarget = new Three.Mesh(
      new Three.PlaneGeometry(width, height),
      new Three.MeshBasicMaterial({ color })
    );
    shadowTarget.visible = visible;
    shadowTarget.name = name;

    return shadowTarget;
  }
}

export default Light;
