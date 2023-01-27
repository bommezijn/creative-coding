const canvasSketch = require('canvas-sketch');
function addTitle(text) {
  const el = document.createElement('h1')
  el.textContent = text;
  document.body.appendChild(el)
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
}

addTitle('Course 1 Unit 5')

let manager;

const settings = {
  dimensions: [ 512, 512 ],
  // animate: true,
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
    // console.log(metrics)
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft +  metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxDescent + metrics.actualBoundingBoxAscent;

    const x = (width - mw) * 0.5 - mx;
    const y = (height - mh) * 0.5 - my;

    context.save();
    context.translate(x, y);

    context.beginPath()
    
    // context.rect(mx, my, mw, mh);
    // context.stroke()

    // context.fillText(text, 0,0);
    context.strokeText(text, 0,0);
    context.restore();
  };
};

// cant turn on animate as that would update on every frame, hence it would be better to use async
const onKeyUp = async (e) => {
  text = e.key;
  manager.render();
}

document.addEventListener('keyup', onKeyUp)




/*
let url = 'https://picsum.photos/200'
const loadAnImage = async (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
    image.src = url;
  })
}

const start = async () => {
  const image = await loadAnImage(url);
  console.log(`image width: ${image.width}`, image)
}
 */

// Wrap canvasSketch in an async function so we can use await to load the key 
const start = async () => {
  manager = await canvasSketch(sketch, settings);
}
start();
// canvasSketch(sketch, settings);