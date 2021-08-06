import * as Three from "three";
import bottleConf from "@/confs/bottle";

import headImg from "@/assets/images/head.png";
// import topImg from "@/assets/images/top.png";
import middleImg from "@/assets/images/top.png";
import bottomImg from "@/assets/images/bottom.png";

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

    // 定义纹理
    const loader = new Three.TextureLoader();
    const specularTexture = loader.load(headImg);
    const middleTexture = loader.load(middleImg);
    const bottomTexture = loader.load(bottomImg);
    // const basicMaterial = new Three.MeshPhongMaterial({ color: materialColor });
    const specularMaterial = new Three.MeshPhongMaterial({
      map: specularTexture,
    });
    const middleMaterial = new Three.MeshPhongMaterial({
      map: middleTexture,
    });
    const bottomMaterial = new Three.MeshPhongMaterial({
      map: bottomTexture,
    });

    // 定义载体
    this.obj = new Three.Object3D();
    this.obj.name = name;
    this.obj.position.set(initPosition.x, initPosition.y, initPosition.z);

    this.bottle = new Three.Object3D();

    // 头部
    this.head = new Three.Mesh(
      new Three.OctahedronGeometry(head.radius),
      specularMaterial
    );
    this.head.position.y = head.positionY;
    this.head.castShadow = true;

    // 身体
    this.body = new Three.Object3D();

    const bodyTopGrometry = new Three.SphereGeometry(
      bodyTop.radius,
      bodyTop.segments,
      bodyTop.segments
    );
    bodyTopGrometry.scale(1, bodyTop.scaleY, 1);
    const bodyTopMesh = new Three.Mesh(bodyTopGrometry, specularMaterial);
    bodyTopMesh.position.y = bodyTop.positionY;
    bodyTopMesh.castShadow = true;

    const bodyMiddleMesh = new Three.Mesh(
      new Three.CylinderGeometry(
        bodyMiddle.topRadius,
        bodyMiddle.bottomRadius,
        bodyMiddle.height,
        bodyMiddle.segments
      ),
      middleMaterial
    );
    bodyMiddleMesh.position.y = bodyMiddle.positionY;
    bodyMiddleMesh.castShadow = true;

    const bodyBottomMesh = new Three.Mesh(
      new Three.CylinderGeometry(
        bodyBottom.topRadius,
        bodyBottom.bottomRadius,
        bodyBottom.height,
        bodyBottom.segments
      ),
      bottomMaterial
    );
    bodyBottomMesh.position.y = bodyBottom.positionY;
    bodyBottomMesh.castShadow = true;

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
