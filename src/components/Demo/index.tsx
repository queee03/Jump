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
  // 相机：位置属性
  // https://www.cnblogs.com/v-weiwang/p/6072235.html
  // camera.position.x = 100;
  // camera.position.y = 100;
  camera.position.z = 100;
  camera.lookAt(scene.position); // 0,0,0
  // camera.lookAt(30, 30, 30);

  // 渲染器
  const renderer = new WebGLRenderer();
  renderer.setClearColor("#cad3c3");
  renderer.setSize($w, $h);
  // 坐标系
  const axes = new AxesHelper(300);
  // 添加
  scene.add(axes);
  scene.add(triangle);

  // animate loop
  const animate = function () {
    // 类似于定时器
    requestAnimationFrame(animate);

    triangle.rotation.x += 0.02;

    renderer.render(scene, camera);
  };

  useEffect(() => {
    if (ref.current) ref.current.appendChild(renderer.domElement);
    animate();
  }, []);

  return <div ref={ref}></div>;
}

export default App;
