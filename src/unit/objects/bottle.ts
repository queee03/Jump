import * as Three from "three";
import customAnimation from "@/libs/animation";
import blockConf from "@/confs/block";
import bottleConf from "@/confs/bottle";
import type { DirectionEnum, AxisEnum, StatusEnum } from "@/confs/bottle";

class Bottle {
  obj: Three.Object3D;
  bottle: Three.Object3D;
  head: Three.Object3D;
  body: Three.Object3D;
  status: StatusEnum = bottleConf.initStatus;
  scale: number = bottleConf.initScale;
  direction: DirectionEnum = 0;
  axis: AxisEnum;
  lastFrameTime = Date.now();
  flyingTime = 0;
  static specularMaterial: Three.MeshPhongMaterial;
  static middleMaterial: Three.MeshPhongMaterial;
  static bottomMaterial: Three.MeshPhongMaterial;

  constructor() {
    this.obj = new Three.Object3D();
    this.bottle = new Three.Object3D();
    this.head = new Three.Object3D();
    this.body = new Three.Object3D();

    this.init();
  }

  init() {
    this.initTexture();
    this.initHead();
    this.initBody();
    this.initObj();
    this.bottle.add(this.head);
    this.bottle.add(this.body);
    this.obj.add(this.bottle);
  }

  initTexture() {
    const { texture } = bottleConf;
    const loader = new Three.TextureLoader();
    const specularTexture = loader.load(texture.specular);
    const middleTexture = loader.load(texture.middle);
    const bottomTexture = loader.load(texture.bottom);
    Bottle.specularMaterial = new Three.MeshPhongMaterial({
      map: specularTexture,
    });
    Bottle.middleMaterial = new Three.MeshPhongMaterial({
      map: middleTexture,
    });
    Bottle.bottomMaterial = new Three.MeshPhongMaterial({
      map: bottomTexture,
    });
  }

  initObj() {
    const {
      name,
      initPosition: { x, y, z },
    } = bottleConf;
    this.obj.name = name;
    this.obj.position.set(x, y, z);
  }

  initHead() {
    const { radius, positionY, castShadow } = bottleConf.head;
    const head = new Three.Mesh(
      new Three.OctahedronGeometry(radius),
      Bottle.specularMaterial
    );
    head.castShadow = castShadow;
    this.head.add(head);
    this.head.position.y = positionY;
  }

  initBody() {
    const { bodyBottom, bodyMiddle, bodyTop } = bottleConf;

    const bodyTopGrometry = new Three.SphereGeometry(
      bodyTop.radius,
      bodyTop.segments,
      bodyTop.segments
    );
    bodyTopGrometry.scale(1, bodyTop.scaleY, 1);
    const bodyTopMesh = new Three.Mesh(
      bodyTopGrometry,
      Bottle.specularMaterial
    );
    bodyTopMesh.position.y = bodyTop.positionY;
    bodyTopMesh.castShadow = bodyTop.castShadow;

    const bodyMiddleMesh = new Three.Mesh(
      new Three.CylinderGeometry(
        bodyMiddle.topRadius,
        bodyMiddle.bottomRadius,
        bodyMiddle.height,
        bodyMiddle.segments
      ),
      Bottle.middleMaterial
    );
    bodyMiddleMesh.position.y = bodyMiddle.positionY;
    bodyMiddleMesh.castShadow = bodyMiddle.castShadow;

    const bodyBottomMesh = new Three.Mesh(
      new Three.CylinderGeometry(
        bodyBottom.topRadius,
        bodyBottom.bottomRadius,
        bodyBottom.height,
        bodyBottom.segments
      ),
      Bottle.bottomMaterial
    );
    bodyBottomMesh.position.y = bodyBottom.positionY;
    bodyBottomMesh.castShadow = bodyBottom.castShadow;

    this.body.add(bodyBottomMesh);
    this.body.add(bodyMiddleMesh);
    this.body.add(bodyTopMesh);
  }

  update() {
    const {
      head: { rotateRate },
    } = bottleConf;

    if (this.status === "shrink") {
      this.shrinkUpdate();
    } else if (this.status === "jump") {
      const tickTime = Date.now() - this.lastFrameTime;
      this.jumpUpdate(tickTime);
    }

    this.head.rotation.y += rotateRate;
    this.lastFrameTime = Date.now();
  }

  showup() {
    const { startPosition, showup } = bottleConf;
    customAnimation.to(
      this.obj.position,
      startPosition,
      showup.duration,
      showup.type
    );
  }

  shrink() {
    // console.log("shrink");
    this.status = "shrink";
  }

  shrinkUpdate() {
    const {
      shrink: { minScale, horizonDeltaScale, deltaScale, headDelta },
    } = bottleConf;

    let scale = this.scale - deltaScale;
    if (scale < minScale) return;

    this.scale = scale;
    this.body.scale.y = this.scale;
    this.body.scale.x += horizonDeltaScale;
    this.body.scale.z += horizonDeltaScale;
    this.head.position.y -= headDelta;

    const deltaY = blockConf.height * blockConf.shrink.deltaScale;
    this.obj.position.y -= deltaY; // block向下压缩，小人也要跟着往下掉
  }

  rebound() {
    this.status = "stop";
    this.reboundUpdate();
  }

  reboundUpdate() {
    const {
      initScale,
      rebound: { animations, animationType },
    } = bottleConf;
    this.scale = initScale;
    const arr = animations.map((item) => {
      const { unit, attribute, ...props } = item;
      const from = this[unit][attribute];
      return { from, type: animationType, ...props };
    });
    customAnimation.tos(arr);
  }

  jump() {
    this.status = "jump";
  }

  jumpUpdate(tickTime: number) {
    this.flyingTime += tickTime;
  }

  setDirection(direction: DirectionEnum, axis: AxisEnum) {
    this.direction = direction;
    this.axis = axis;
  }

  rotate() {
    const {
      rotate: { animationType, animations },
    } = bottleConf;
    this.bottle.rotation.x = this.bottle.rotation.z = 0;
    if (this.direction === 0) {
      // animations.forEach((item) => {
      //   const { x, y, z } = item;
      //   const rotation = this.bottle.rotation;
      //   customAnimation.to(
      //     rotation,
      //     {
      //       x: x ? rotation.x + x : rotation.x,
      //       y: y ? rotation.y + y : rotation.y,
      //       z: z ? rotation.z + z : rotation.z,
      //     },
      //     item.duration,
      //     animationType,
      //     item.delay
      //   );
      // });
    }
  }
}

export default Bottle;
