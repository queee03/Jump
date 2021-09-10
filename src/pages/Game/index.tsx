import React, { useEffect, useRef } from "react";
import { Scene } from "@/unit/scene/index";
import Ground from "@/unit/objects/ground";
import Bottle from "@/unit/objects/bottle";
import BaseBlock from "@/unit/block/base";
import Cuboid from "@/unit/block/cuboid";
import Cylinder from "@/unit/block/cylinder";

import blockConf from "@/confs/block";
import gameConf from "@/confs/game";
import type { DirectionEnum } from "@/confs/game";

function Page() {
  const ref = useRef<HTMLDivElement>(null);
  // const sceneRef = useRef<Scene | undefined>();
  // const bottleRef = useRef<Bottle | undefined>();

  // - 需优化为ref? -
  const scene = new Scene();
  const renderer = scene.renderer;
  const bottle = new Bottle();
  let targetPosition = { x: 0, y: 0, z: 0 };
  let currentBlock: BaseBlock;
  let touchStartTime = 0;
  let touchEndTime = 0;

  const setDirection = (direction: DirectionEnum) => {
    bottle.setDirection(direction, targetPosition);
  };

  const addGround = () => {
    const ground = new Ground();
    scene.instance.add(ground.instance);
    // const background = new Background();
    // scene.instance.add(background.instance);
  };

  const addInitBlock = () => {
    const { initPosition } = blockConf;
    const { initDirection } = gameConf;
    const cuboidBlock = new Cuboid(
      initPosition.x,
      initPosition.y,
      initPosition.z
    );

    const secondPosition = { x: 23, y: 0, z: 0 };
    const cylinderBlock = new Cylinder(
      secondPosition.x,
      secondPosition.y,
      secondPosition.z
    );
    currentBlock = cuboidBlock;

    targetPosition = { ...secondPosition };
    setDirection(initDirection);

    scene.instance.add(cuboidBlock.instance);
    scene.instance.add(cylinderBlock.instance);
  };

  const addBottle = () => {
    // bottleRef.current = new Bottle();
    scene.instance.add(bottle.obj);
    bottle.showup();
  };

  const updateBlock = () => {
    currentBlock.update();
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

    touchStartTime = Date.now();
    bottle.shrink();
    currentBlock.shrink();
  };

  const handleTouchEnd = () => {
    console.log("onTouchEnd");

    touchEndTime = Date.now();
    const duration = touchEndTime - touchStartTime;

    bottle.stop();
    currentBlock.stop();
    bottle.setVelocity(duration);
    bottle.jump();
    bottle.rotate();
  };

  useEffect(() => {
    if (ref.current) ref.current.appendChild(renderer.domElement);
    addGround();
    addBottle();
    addInitBlock();
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
