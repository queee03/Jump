import React, { useEffect, useRef } from "react";
import { Scene } from "@/unit/scene/index";
import Ground from "@/unit/objects/ground";
import Bottle from "@/unit/objects/bottle";
import Cuboid from "@/unit/block/cuboid";
import Cylinder from "@/unit/block/cylinder";
import blockConf from "@/confs/block";

function Page() {
  const ref = useRef<HTMLDivElement>(null);
  // const sceneRef = useRef<Scene | undefined>();
  // const bottleRef = useRef<Bottle | undefined>();

  // - 需优化? -
  const scene = new Scene();
  const bottle = new Bottle();
  const renderer = scene.renderer;

  const addInitBlock = () => {
    const { initPosition } = blockConf;
    const cuboidBlock = new Cuboid(
      initPosition.x,
      initPosition.y,
      initPosition.z
    );
    const cylinderBlock = new Cylinder(23, 0, 0);
    scene.instance.add(cuboidBlock.instance);
    scene.instance.add(cylinderBlock.instance);
  };

  const addGround = () => {
    const ground = new Ground();
    scene.instance.add(ground.instance);
    // const background = new Background();
    // scene.instance.add(background.instance);
  };

  const addBottle = () => {
    // bottleRef.current = new Bottle();
    scene.instance.add(bottle.obj);
    bottle?.showup();
  };

  const updateBottle = () => {
    bottle?.update();
  };

  const animate = () => {
    scene.render();
    updateBottle();
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (ref.current) ref.current.appendChild(renderer.domElement);
    addInitBlock();
    addGround();
    addBottle();
    animate();
  }, []);

  return (
    <div
      ref={ref}
      onTouchStart={() => {
        console.log(1);
        bottle?.rotate();
      }}
      onTouchEnd={() => {
        console.log(2);
      }}
    ></div>
  );
}

export default Page;
