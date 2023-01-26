const canvasSketch = require('canvas-sketch');
function addTitle(text) {
  const el = document.createElement('h1')
  el.textContent = text;
  document.body.appendChild(el)
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
}

addTitle('Course 1 Unit 5')


const settings = {
  dimensions: [ 512, 512 ]
};

let text = "NB";
let fontSize = 360;
let fontFamily = "arial";

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    
    context.fillStyle = 'black';
    context.textBaseline = 'top';
    // context.textAlign = 'center';
    context.font = `${fontSize}px ${fontFamily}`;
    

    const metrics = context.measureText(text);
    console.log(metrics)
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft +  metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxDescent + metrics.actualBoundingBoxAscent;

    const x = (width - mw) * 0.5 - mx;
    const y = (height - mh) * 0.5 - my;

    context.save();
    context.translate(x, y);

    context.beginPath()
    
    context.rect(mx, my, mw, mh);
    context.stroke()

    // context.fillText(text, 0,0);
    context.strokeText(text, 0,0);
    context.restore();
  };
};

canvasSketch(sketch, settings);
