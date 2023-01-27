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

let text = "N";
let fontSize = 360;
let fontFamily = "arial";

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');


const sketch = ({ context, width, height }) => {

  const cell = 16;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols;
    
    typeContext.fillStyle = 'white';
    typeContext.textBaseline = 'top';

    typeContext.font = `${fontSize}px ${fontFamily}`;
    

    const metrics = typeContext.measureText(text);

    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft +  metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxDescent + metrics.actualBoundingBoxAscent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath()
    
    // typeContext.strokeText(text, 0,0);
    typeContext.fillText(text, 0,0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;
    // const typeDataT = typeContext.getImageData(0, 0, cols, rows);
    // console.log(typeDataT)
    context.drawImage(typeCanvas, 0, 0);

    for (let index = 0; index < numCells; index++) {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = col * cell;
      const y = row * cell;

      const r = typeData[(index * 4) + 0];
      const g = typeData[(index * 4) + 1];
      const b = typeData[(index * 4) + 2];
      const a = typeData[(index * 4) + 3];

      // context.fillStyle = `rgb(${r}, ${g}, ${b}))`;
      context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;


      context.save()
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      // context.fillRect(0, 0, cell, cell);
      context.beginPath()
      context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      context.fill();
      context.restore()
    }
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