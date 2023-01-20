const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 512, 512 ],
};


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#007bff';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.01;
    const h = height * 0.1;
    let x,y;

    const num = 24; //number of squares
    const radius = width * 0.3; //size of radius


    for (let index = 0; index < num; index++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * index;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);


      context.save();
      context.translate(x,y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 6), random.range(0.1, 0.5));

      context.fillStyle = 'black';
      context.beginPath();
      context.rect(-w * 0.5, random.range(0, h * 0.5) ,w,h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx,cy);
      // context.translate(random.range(0, 512),random.range(0, 512));
      context.rotate(-angle);

      context.lineWidth = random.range(1, 16);
      context.strokeStyle = 'black';

      context.beginPath();
      context.arc(0,0, radius * random.range(0.7, 1.3), slice * random.range(0, -8), slice * random.range(1, 5));
      context.stroke();
      context.restore();
    }

  };
};

canvasSketch(sketch, settings);
