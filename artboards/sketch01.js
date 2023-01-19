const canvasSketch = require('canvas-sketch');
// Transforming context itself

const settings = {
  dimensions: [ 512, 512 ],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.3;
    const h = height * 0.3;

    // save the current state of the context and push on stack
    context.save();
    // positioning the context aka rect to a location on the canvas
    context.translate(x,y);
    // rotating the context aka rect. Rotates from the top left corner of canvas
    context.rotate(0.3);

    context.fillStyle = 'black';
    context.beginPath();
    context.rect(0,0,w,h);
    context.fill();
    // restore last saved state of the context and pop off stack
    context.restore();

    context.translate(100, 400)

    context.beginPath();
    context.arc(0,0,10,0,Math.PI * 2);
    context.fillStyle = '#EC6A2D';
    context.fill();
  };
};

canvasSketch(sketch, settings);
