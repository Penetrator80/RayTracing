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

export function intersectRaySphere(O, D, sphere) {

}