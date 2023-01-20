const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 512, 512 ],
};


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.01;
    const h = height * 0.1;
    let x,y;

    const num = 12; //number of squares
    const radius = width * 0.3; //size of radius


    for (let index = 0; index < num; index++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * index;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);


      context.save();
      context.translate(x,y);
      context.rotate(-angle);
      context.scale(random.range(1, 3), 1);

      context.fillStyle = 'black';
      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5 ,w,h);
      context.fill();
      context.restore();
    }

  };
};

canvasSketch(sketch, settings);
