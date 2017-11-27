const Vector3 = require('vec23').Vec3;

const VW = 1;
const VH = 1;
const Z = 1;

export const INFINITY = 6000;
export const BGCOLOR = new Vector3(255, 255, 255);

const objects = [
  {
    center: new Vector3(0, -1, 3),
    radius: 1,
    color: new Vector3(255, 0, 0)
  },
  {
    center: new Vector3(2, 0, 4),
    radius: 1,
    color: new Vector3(0, 0, 255)
  },
  {
    center: new Vector3(-2, 0, 4),
    radius: 1,
    color: new Vector3(0, 255, 0)
  },
  {
    center: new Vector3(0, -601, 1),
    radius: 600,
    color: new Vector3(255, 255, 0)
  }
];

const lights = [
  {
    type: 'ambient',
    intensity: 0.2
  },
  {
    type: 'point',
    intensity: 0.6,
    position: new Vector3(0, 0.8, 4)
  },
  {
    type: 'direction',
    intensity: 0.6,
    direction: new Vector3(0, 0, 1)
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

  //debugger;

  let temp = D.multiply(closest_t);
  let P = O.add(temp);
  let N = P.subtract(closest_sphere.center);
  let N_len = N.length();
  N = N.divide(N_len);

  let i = computerLighting(P, N);
  let sphereColor = closest_sphere.color.multiply(i);

  return sphereColor;
  //return closest_sphere.color;
}

function computerLighting(P, N) {
  let i = 0.0;
  let L = new Vector3(0, 0, 0);

  lights.forEach(function(light){
    if(light.type === 'ambient') {
      i = i + light.intensity;
    } else {
      //debugger;
      if (light.type === 'point') {
        L = light.position.subtract(P)
      } else if (light.type === 'direction') {
        L = light.direction;
      }

      let N_dot_L = N.dot(L);
      if (N_dot_L > 0) {
        //console.log(N);
        let diff = light.intensity * N_dot_L / N.length() * L.length();
        //debugger
        //console.log(diff);
        i = i + diff;
      }
    }
  });

  return i;
}

function inInterval(x, x1, x2) {
  if(x >= x1 && x <= x2) {
    return true;
  }

  return false;
}