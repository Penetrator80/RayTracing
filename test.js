import {setPixel, putPixel} from "./tools"

export function test() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let cw = canvas.width;
  let ch = canvas.height;

  let data = ctx.createImageData(cw, ch);

// обходим в цикле каждый пиксель
  let t0 = new Date().getTime();
  for (let x = 0; x < data.width; x++) {
    for (let y = 0; y < data.height; y++) {

      let val = 250;

      setPixel(data, x, y, val, val ,val, 255)

    }
  }
  let t1 = new Date().getTime();
  console.log('points: ' + cw * ch, 'time: ' + (t1 - t0)/1000 + 'ms');
// устанавливаем данные обратно
  ctx.putImageData(data, 0, 0);
}

function setBorder(data) {
  for (let x = 0; x < data.width; x++) {
    let y = 0;
    let val = 0;

    setPixel(data, x, y, 255, val ,val, 255)
  }
  for (let y = 0; y < data.height; y++) {
    let x = data.width - 1;
    let val = 0;

    setPixel(data, x, y, 255, val ,val, 255)
  }
  for (let x = 0; x < data.width; x++) {
    let y = data.height - 1;
    let val = 0;

    setPixel(data, x, y, 255, val ,val, 255)
  }
  for (let y = 0; y < data.height; y++) {
    let x = 0;
    let val = 0;

    setPixel(data, x, y, 255, val ,val, 255)
  }
}

export function setCoord() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let cw = canvas.width;
  let ch = canvas.height;

  let data = ctx.createImageData(cw, ch);

  setBorder(data);

  for (let y = -data.height/2; y < data.height/2; y++) {

    let val = 0;
    let sx = data.width/2;
    let sy = y + ch/2;
    //debugger
    setPixel(data, sx, sy, val, val ,val, 255)
  }

  for (let x = -data.width/2; x < data.width/2; x++) {

    let val = 0;
    let sy = data.height/2;
    let sx = x+ cw/2;
    //debugger
    setPixel(data, sx, sy, val, val ,val, 255)
  }

  // putPixel(data, 10, 10, 0, 0, 255, 255);
  // putPixel(data, 11, 10, 0, 0, 255, 255);
  // putPixel(data, 10, 11, 0, 0, 255, 255);
  // putPixel(data, 11, 11, 0, 0, 255, 255);
  //
  // putPixel(data, 0, 0, 255, 0, 0, 255);

  ctx.putImageData(data, 0, 0);

  
}