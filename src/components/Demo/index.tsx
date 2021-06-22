import React, { useEffect, useRef } from "react";
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  AxesHelper,
  PerspectiveCamera,
} from "three";
import triangle from "./triangle";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  let r = 0;

  const $w = window.innerWidth;
  const $h = window.innerHeight - 1;

  // 场景
  const scene = new Scene();
  // 相机：正交相机
  const camera = new OrthographicCamera(
    $w / -2,
    $w / 2,
    $h / 2,
    $h / -2,
    1,
    1000
  );
  // const camera = new PerspectiveCamera(45, $w / $h, 0.1, 1000);
  // 相机：位置属性
  // https://www.cnblogs.com/v-weiwang/p/6072235.html
  camera.position.x = 200;
  camera.position.y = 200;
  camera.position.z = 200;
  camera.lookAt(scene.position); // 0,0,0
  // camera.lookAt(30, 30, 30);

  // 渲染器
  const renderer = new WebGLRenderer();
  renderer.setClearColor("#cad3c3");
  renderer.setSize($w, $h);
  // 坐标系
  const axes = new AxesHelper(300);

  const tr1 = triangle("#c04851");
  const tr2 = triangle("#eea2a4");

  // tr1.position.x = 6;
  // tr1.position.y = 6;
  tr1.position.z = -40;

  // tr2.position.x = -10;
  // tr2.position.y = -10;
  tr2.position.z = 10;

  // 添加
  scene.add(axes);
  scene.add(tr1);
  scene.add(tr2);

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

  return <div ref={ref}></div>;
}

export default App;
