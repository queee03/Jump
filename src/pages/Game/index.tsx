import React, { useEffect, useRef } from "react";
import { Scene } from "@/unit/scene/index";
import Ground from "@/unit/objects/ground";
import Bottle from "@/unit/objects/bottle";
import Cuboid from "@/unit/block/cuboid";
import Cylinder from "@/unit/block/cylinder";
import blockConf from "@/confs/block";

function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const scene = new Scene();
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
    const bottle = new Bottle();
    scene.instance.add(bottle.obj);
  };

  const animate = () => {
    scene.render();
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (ref.current) ref.current.appendChild(renderer.domElement);
    addInitBlock();
    addGround();
    addBottle();
    animate();
  }, []);

  return <div ref={ref}></div>;
}

export default Page;
