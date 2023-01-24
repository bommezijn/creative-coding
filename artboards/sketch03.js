const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const tweakPane = require('tweakpane');

function addTitle(text) {
  const el = document.createElement('h1')
  el.textContent = text;
  document.body.appendChild(el)
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
}

addTitle('Course 1 Unit 5')


const parameters = {
  cols: 15,
  rows: 15,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  strokeColor: '#FFCC00',
  animate: true,
  frame: 0,
  lineCap: 'butt',
}

const settings = {
  dimensions: [ 512, 512 ],
  animate: true,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = parameters.cols;
    const rows = parameters.rows;
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

      // const n = random.noise2D(x + frame * 24, y, parameters.freq);
      const f = parameters.animate ? frame : parameters.frame;
      const n = random.noise3D(x, y, f * 10, parameters.freq);
      const angle = n * Math.PI * parameters.amp;
      // const scale = (n + 1) / 2 * 30;
      // const scale = (n * 0.5 + 0.5 ) * 30;
      const scale = math.mapRange(n, -1, 1, parameters.scaleMin, parameters.scaleMax);

      const w = cellw * 0.8;
      const h = cellh * 0.8;

      context.save();

      context.translate(x,y);
      context.rotate(angle);
      context.lineWidth = scale;
      context.lineCap = parameters.lineCap;
      context.beginPath();

      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.strokeStyle = parameters.strokeColor;
      context.stroke();

      context.restore()
    }

  };
};

const creatPane = () => {
  const pane = new tweakPane.Pane();

  let folder;
  folder = pane.addFolder({
    title: 'Grid settings',
    expanded: true,
  });
  folder.addInput(parameters, 'lineCap', {options: {butt: 'butt', round: 'round', square: 'square'}})
  folder.addInput(parameters, 'animate');
  folder.addInput(parameters, 'cols', { min: 2, max: 50, step: 1 });
  folder.addInput(parameters, 'rows', { min: 2, max: 50, step: 1 });
  folder.addInput(parameters, 'scaleMin', { min: 1, max: 100 });
  folder.addInput(parameters, 'scaleMax', { min: 1, max: 100 });
  folder.addInput(parameters, 'strokeColor');

  folder = pane.addFolder({
    title: 'Noise'
  })
  folder.addInput(parameters, 'freq', { min: -0.01, max: 0.05 });
  folder.addInput(parameters, 'amp', { min: 0, max: 1 });
  folder.addInput(parameters, 'frame', { min: 0, max: 1000 });

} 

creatPane()
canvasSketch(sketch, settings);
