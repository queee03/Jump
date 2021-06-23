import React, { useEffect, useRef } from "react";
import { Scene } from "@/unit/scene/index";
import Cuboid from "@/unit/block/cuboid";
import Cylinder from "@/unit/block/cylinder";

function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const scene = new Scene();
  const renderer = scene.renderer;

  const addInitBlock = () => {
    const cuboidBlock = new Cuboid(-15, 0, 0);
    const cylinderBlock = new Cylinder(23, 0, 0);
    scene.instance.add(cuboidBlock.instance);
    scene.instance.add(cylinderBlock.instance);
  };

  const animate = () => {
    scene.render();
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (ref.current) ref.current.appendChild(renderer.domElement);
    addInitBlock();
    animate();
  }, []);

  return <div ref={ref}></div>;
}

export default Page;
