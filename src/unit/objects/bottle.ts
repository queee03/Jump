import * as Three from "three";
import bottleConf from "@/confs/bottle";

import headImg from "@/assets/images/head.png";
// import topImg from "@/assets/images/top.png";
import middleImg from "@/assets/images/top.png";
import bottomImg from "@/assets/images/bottom.png";

export type BottleType = {
  obj: Three.Object3D;
  bottle: Three.Object3D;
  head: Three.Object3D;
  body: Three.Object3D;
};

class Bottle implements BottleType {
  obj: Three.Object3D;
  bottle: Three.Object3D;
  head: Three.Object3D;
  body: Three.Object3D;
  static specularMaterial: Three.MeshPhongMaterial;
  static middleMaterial: Three.MeshPhongMaterial;
  static bottomMaterial: Three.MeshPhongMaterial;

  constructor() {
    this.obj = new Three.Object3D();
    this.bottle = new Three.Object3D();
    this.head = new Three.Object3D();
    this.body = new Three.Object3D();

    this.initTexture();
    this.initObj();
    this.initHead();
    this.initBody();
    this.init();
  }

  initTexture() {
    const loader = new Three.TextureLoader();
    const specularTexture = loader.load(headImg);
    const middleTexture = loader.load(middleImg);
    const bottomTexture = loader.load(bottomImg);
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
    const { radius, positionY } = bottleConf.head;
    const head = new Three.Mesh(
      new Three.OctahedronGeometry(radius),
      Bottle.specularMaterial
    );
    head.position.y = positionY;
    head.castShadow = true;
    this.head.add(head);
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
    bodyTopMesh.castShadow = true;

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
    bodyMiddleMesh.castShadow = true;

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
    bodyBottomMesh.castShadow = true;

    this.body.add(bodyBottomMesh);
    this.body.add(bodyMiddleMesh);
    this.body.add(bodyTopMesh);
  }

  init() {
    this.bottle.add(this.head);
    this.bottle.add(this.body);
    this.obj.add(this.bottle);
  }

  update() {
    this.head.rotation.y += 0.06;
  }
}

export default Bottle;
