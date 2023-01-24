const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

function addTitle(text) {
  const el = document.createElement('h1')
  el.textContent = text;
  document.body.appendChild(el)
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
}

addTitle('Course 1 Unit 5')


const settings = {
  dimensions: [ 512, 512 ],
  animate: true,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = 5;
    const rows = 5;
    const cells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

    const cellw = gridw / cols;
    const cellh = gridh / rows;
    
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    //calc row and col by math in for loop
    for (let i = 0; i < cells; i++) {
      const col = i % cols;
      // cant do the same for row because I is increasing but not left to right. have to check end of row
      const row  = Math.floor(i / cols);

      const x = col * cellw + margx + (cellw * 0.5);
      const y = row * cellh + margy + (cellh * 0.5);

      const n = random.noise2D(x + frame * 10, y, 0.001);
      const angle = n * Math.PI * 0.2;
      // const scale = (n + 1) / 2 * 30;
      // const scale = (n * 0.5 + 0.5 ) * 30;
      const scale = math.mapRange(n, -1, 1, 1, 15);

      const w = cellw * 0.8;
      const h = cellh * 0.8;

      context.save();

      context.translate(x,y);
      context.rotate(angle);
      context.lineWidth = scale;
      context.beginPath();

      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore()
    }

  };
};

canvasSketch(sketch, settings);