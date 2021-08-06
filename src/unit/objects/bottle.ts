import bottle from "@/confs/bottle";
import * as Three from "three";
import bottleConf from "@/confs/bottle";

export type BottleType = {
  obj: Three.Object3D;
  bottle: Three.Object3D;
  head: Three.Mesh;
  body: Three.Object3D;
};

class Bottle implements BottleType {
  obj: Three.Object3D;
  bottle: Three.Object3D;
  head: Three.Mesh;
  body: Three.Object3D;
  constructor() {
    const {
      name,
      initPosition,
      head,
      bodyBottom,
      bodyMiddle,
      bodyTop,
      materialColor,
    } = bottleConf;

    this.obj = new Three.Object3D();
    this.obj.name = name;
    this.obj.position.set(initPosition.x, initPosition.y, initPosition.z);

    const basicMaterial = new Three.MeshPhongMaterial({ color: materialColor });
    this.bottle = new Three.Object3D();

    // 头部
    this.head = new Three.Mesh(
      new Three.OctahedronGeometry(head.radius),
      basicMaterial
    );
    this.head.position.y = head.positionY;
    this.head.castShadow = true;

    // 身体
    this.body = new Three.Object3D();
    const bodyBottomMesh = new Three.Mesh(
      new Three.CylinderGeometry(
        bodyBottom.topRadius,
        bodyBottom.bottomRadius,
        bodyBottom.height,
        bodyBottom.segments
      ),
      basicMaterial
    );
    bodyBottomMesh.position.y = bodyBottom.positionY;
    bodyBottomMesh.castShadow = true;

    const bodyMiddleMesh = new Three.Mesh(
      new Three.CylinderGeometry(
        bodyMiddle.topRadius,
        bodyMiddle.bottomRadius,
        bodyMiddle.height,
        bodyMiddle.segments
      ),
      basicMaterial
    );
    bodyMiddleMesh.position.y = bodyMiddle.positionY;
    bodyMiddleMesh.castShadow = true;

    const bodyTopGrometry = new Three.SphereGeometry(
      bodyTop.radius,
      bodyTop.segments,
      bodyTop.segments
    );
    bodyTopGrometry.scale(1, bodyTop.scaleY, 1);
    const bodyTopMesh = new Three.Mesh(bodyTopGrometry, basicMaterial);
    bodyTopMesh.position.y = bodyTop.positionY;
    bodyTopMesh.castShadow = true;

    this.body.add(bodyBottomMesh);
    this.body.add(bodyMiddleMesh);
    this.body.add(bodyTopMesh);

    // 接入
    this.bottle.add(this.head);
    this.bottle.add(this.body);
    this.obj.add(this.bottle);
  }
}

export default Bottle;
