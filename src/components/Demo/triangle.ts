import {
  Shape,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
} from "three";

const x = 0,
  y = 100;
const shape = new Shape();
shape.moveTo(x, y);
shape.lineTo(x + 50, y + -100);
shape.lineTo(x - 50, y + -100);
shape.lineTo(x, y);
const geometry = new ShapeGeometry(shape);
const material = new MeshBasicMaterial({ color: "#951c48", side: DoubleSide });
const triangle = new Mesh(geometry, material);

triangle.position.x = 6;
triangle.position.y = 6;
// triangle.position.z = 3;

export default triangle;
