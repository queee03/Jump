import React, { useEffect, useRef } from "react";
import { Scene } from "@/unit/scene/index";
import Ground from "@/unit/objects/ground";
import Bottle from "@/unit/objects/bottle";
import BaseBlock from "@/unit/block/base";
import Cuboid from "@/unit/block/cuboid";
import Cylinder from "@/unit/block/cylinder";
import blockConf from "@/confs/block";

function Page() {
  const ref = useRef<HTMLDivElement>(null);
  // const sceneRef = useRef<Scene | undefined>();
  // const bottleRef = useRef<Bottle | undefined>();

  // - 需优化为ref? -
  const scene = new Scene();
  const renderer = scene.renderer;
  const bottle = new Bottle();
  let currentBlock: BaseBlock;

  const addGround = () => {
    const ground = new Ground();
    scene.instance.add(ground.instance);
    // const background = new Background();
    // scene.instance.add(background.instance);
  };

  const addInitBlock = () => {
    const { initPosition } = blockConf;
    const cuboidBlock = new Cuboid(
      initPosition.x,
      initPosition.y,
      initPosition.z
    );
    const cylinderBlock = new Cylinder(23, 0, 0);
    currentBlock = cuboidBlock;
    scene.instance.add(cuboidBlock.instance);
    scene.instance.add(cylinderBlock.instance);
  };

  const addBottle = () => {
    // bottleRef.current = new Bottle();
    scene.instance.add(bottle.obj);
    bottle.showup();
  };

  const updateBlock = () => {
    currentBlock?.update();
  };

  const updateBottle = () => {
    bottle.update();
  };

  const animate = () => {
    scene.render();
    updateBlock();
    updateBottle();
    requestAnimationFrame(animate);
  };

  const handleTouchStart = () => {
    console.log("onTouchStart");
    bottle?.shrink();
    currentBlock?.shrink();
  };

  const handleTouchEnd = () => {
    console.log("onTouchEnd");
    bottle?.stop();
    currentBlock?.rebound();
    bottle?.rotate();
  };

  useEffect(() => {
    if (ref.current) ref.current.appendChild(renderer.domElement);
    addGround();
    addInitBlock();
    addBottle();
    animate();
  }, []);

  return (
    <div
      ref={ref}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    ></div>
  );
}

export default Page;
