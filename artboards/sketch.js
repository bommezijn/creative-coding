const canvasSketch = require('canvas-sketch');
document.querySelector('body').style.backgroundColor = '#FDD854';

const settings = {
  dimensions: [ 512, 512 ],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    // context.strokeStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    const w = width * 0.10;
    const h = height * 0.10;
    const gap = width * 0.03;

    const ix = width * 0.17;
    const iy = height * 0.17;

    const off = width * 0.02;
    let x,y;

    for (let index = 0; index < 5; index++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * index;
        y = iy + (w + gap) * j;
        
        // draw big square
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();
    
        // Conditional to draw only if index is bigger than 0 and smaller than 4
        // if(index > 0 && index < 4) {
        //   // draw small square
        //   context.beginPath();
        //   context.rect(x + 8, y + 8, w - 16, h - 16);
        //   context.stroke();
        // }
    
        // Draw random small squares within larger squares
        if(Math.random() > 0.5) {
          // draw small square
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
