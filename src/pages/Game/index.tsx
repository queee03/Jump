import React, { useEffect, useRef } from "react";
import { Scene } from "@/unit/scene/index";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const scene = new Scene();
  const renderer = scene.renderer;

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
