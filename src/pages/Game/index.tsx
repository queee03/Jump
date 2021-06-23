import React, { useEffect, useRef } from "react";
import { Scene } from "@/scene/index";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const scene = new Scene();
  scene.init();
  const renderer = scene.renderer;
  console.log(renderer);

  const animate = () => {
    requestAnimationFrame(animate);
    scene.render();
  };

  useEffect(() => {
    if (ref.current) ref.current.appendChild(renderer.domElement);
    animate();
  }, []);

  return <div ref={ref}></div>;
}

export default App;
