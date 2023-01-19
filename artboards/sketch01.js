const canvasSketch = require('canvas-sketch');
// Transforming context itself

const settings = {
  dimensions: [ 512, 512 ],
};

const degToRad = (degrees) => { 
  return degrees / 180 * Math.PI;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5; //center of circle
    const cy = height * 0.5;

    const w = width * 0.01;
    const h = height * 0.1;
    let x,y; // going to be modified in loop

    const num = 24; //number of squares
    const radius = width * 0.3; //size of radius


    for (let index = 0; index < num; index++) {
      const slice = degToRad(360 / num);
      const angle = slice * index;

      x = radius * Math.sin(angle); // or cx/cy + radius * Math.sin(angle)
      y = radius * Math.cos(angle);


      context.save();
      context.translate(cx,cy);
      context.translate(x,y);
      context.rotate(-angle);

      context.fillStyle = 'black';
      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5 ,w,h);
      context.fill();
      context.restore();
    }

/*  
// save the current state of the context and push on stack
    context.save();
    // positioning the context aka rect to a location on the canvas
    context.translate(x,y);
    // rotating the context aka rect. Rotates from the top left corner of canvas. is in radians instead of deg
    // context.rotate(0.3);
    //hassle to do it constantly, make a func for it
    // context.rotate(45 / 100 * Math.PI);
    context.rotate(degToRad(45)); //hassle to do it constantly, make a func for it

    context.fillStyle = 'black';
    context.beginPath();
    context.rect(0,0,w,h);
    context.fill();
    // restore last saved state of the context and pop off stack
    context.restore();
*/
  };
};

canvasSketch(sketch, settings);
