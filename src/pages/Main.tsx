import React, { useEffect, useRef } from "react";
import { Scene, WebGLRenderer, AxesHelper, PerspectiveCamera } from "three";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  let r = 0;

  const $w = window.innerWidth;
  const $h = window.innerHeight - 1;

  // 场景
  const scene = new Scene();
  // 相机
  const camera = new PerspectiveCamera(45, $w / $h, 0.1, 1000);

  // 渲染器
  const renderer = new WebGLRenderer();
  renderer.setClearColor("#cad3c3");
  renderer.setSize($w, $h);

  // animate loop
  const animate = function () {
    // 类似于定时器
    requestAnimationFrame(animate);

    // tr1.rotation.x += 0.02;

    renderer.render(scene, camera);
  };

  useEffect(() => {
    if (ref.current) ref.current.appendChild(renderer.domElement);
    animate();
  }, []);

  return <div ref={ref}>1</div>;
}

export default App;
