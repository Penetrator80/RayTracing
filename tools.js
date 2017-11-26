const Vector3 = require('vec23').Vec3;

const VW = 1;
const VH = 1;
const Z = 1;

export const INFINITY = 1000;
export const BGCOLOR = [255, 255, 255];

const objects = [
  {
    center: new Vector3(0, -1, 3),
    radius: 1,
    color: [255, 0, 0]
  },
  {
    center: new Vector3(2, 0, 4),
    radius: 1,
    color: [0, 0, 255]
  },
  {
    center: new Vector3(-2, 0, 4),
    radius: 1,
    color: [0, 255, 0]
  }
];

export function setPixel(imageData, x, y, r, g, b, a) {

  let index = (x + y * imageData.width)  * 4;
  imageData.data[index+0] = r;
  imageData.data[index+1] = g;
  imageData.data[index+2] = b;
  imageData.data[index+3] = a;

}

export function putPixel(imageData, x, y, r, g, b, a) {

  let sx = imageData.width/2 + x;
  let sy = imageData.height/2 - y;

  setPixel(imageData, sx, sy, r, g, b, a);

}

export function canvasToViewport(x, y, cw, ch) {
  //debugger
  let x1 = x * VW / cw;
  let y1 = y * VH / ch;
  let z = Z;
  let D = new Vector3(x1, y1, z);

  // let O = new Vector3(0, 0, 0);
  // let sphere = objects[0];
  // intersectRaySphere(O, D, sphere);

  return D;
}

function intersectRaySphere(O, D, sphere) {
  //debugger
  let C = sphere.center.clone();
  let r = sphere.radius;
  let OC = O.subtract(C);

  let k1 = D.dot(D);
  let k2 = 2 * D.dot(OC);
  let k3 = OC.dot(OC) - r*r;

  let determinant = k2 * k2 - 4 * k1 * k3;
  if(determinant < 0) {
    return {INFINITY, INFINITY};
  }

  let t1 = (-k2 + Math.sqrt(determinant)) / (2 * k1);
  let t2 = (-k2 - Math.sqrt(determinant)) / (2 * k1);

  return {t1, t2};
}

export function traceRay(O, D, t_min, t_max) {
  let closest_t = INFINITY
  let closest_sphere = null;

  objects.forEach(function(sphere){
    let t1_t2 = intersectRaySphere(O, D, sphere)
    if(inInterval(t1_t2.t1, t_min, t_max) && t1_t2.t1 < closest_t) {
      closest_t = t1_t2.t1;
      closest_sphere = sphere;
    } else if(inInterval(t1_t2.t2, t_min, t_max) && t1_t2.t1 < closest_t) {
      closest_t = t1_t2.t2;
      closest_sphere = sphere;
    }
  })

  if(closest_sphere === null) {
    return BGCOLOR;
  }

  return closest_sphere.color;
}

function inInterval (x, x1, x2) {
  if(x >= x1 && x <= x2) {
    return true;
  }

  return false;
}