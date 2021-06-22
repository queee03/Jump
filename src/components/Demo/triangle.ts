import {
  Shape,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
} from "three";

const triangle = (color = "black", x = 0, y = 0, c = 100, h = 100) => {
  const shape = new Shape();
  shape.moveTo(x, y);
  shape.lineTo(x + c / 2, y - h);
  shape.lineTo(x - c / 2, y - h);
  shape.lineTo(x, y);
  const geometry = new ShapeGeometry(shape);
  const material = new MeshBasicMaterial({
    color,
    side: DoubleSide,
  });
  return new Mesh(geometry, material);
};

export default triangle;
