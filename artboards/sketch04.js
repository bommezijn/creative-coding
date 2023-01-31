const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const Color = require('canvas-sketch-util/color');

function addTitle(text) {
  const el = document.createElement('h1')
  el.textContent = text;
  document.body.appendChild(el)
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
}

addTitle('Course 1 Unit 5')

let manager, image;

const settings = {
  dimensions: [ 512, 512 ],
  animate: true,
};

let text = "N";
let fontSize = 24;
// let fontFamily = "PP Neue World";
let fontFamily = "PP Supply Mono";

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');


const sketch = ({ context, width, height }) => {

  const cell = 4;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    // fontSize = cols  * 1.2 ;
    typeContext.save();
    typeContext.drawImage(image, 0,0, cols, rows);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;
    // const typeDataT = typeContext.getImageData(0, 0, cols, rows);
    // console.log(typeDataT)
    
    typeContext.fillStyle = 'black';
    context.fillRect(0,0, width, height);

    // typeContext.textBaseline = 'top';
    context.textBaseLine = 'middle';
    context.textAlign = 'center';

    for (let index = 0; index < numCells; index++) {
      const col = index % cols;
      const row = Math.floor(index / cols);

      const x = col * cell + random.range(-cell, cell) * 0.5;
      const y = row * cell + random.range(-cell, cell) * 0.5;

      const r = typeData[(index * 4) + 0];
      const g = typeData[(index * 4) + 1];
      const b = typeData[(index * 4) + 2];
      const a = typeData[(index * 4) + 3];

      const hexC = Color.parse([ r, g, b, a ]).hex;

      const glyph = getGlyph(g);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) context.font = `${cell * 3}px ${fontFamily}`;

      context.fillStyle =  hexC;

      context.save()
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      context.fillText(glyph, 0,0);

      context.restore()
    }
  };
};

const getGlyph = (v) => {
  if (v < 50) return '';
  if (v < 100) return '.';
  if (v < 150) return '-';
  if (v < 200) return '+';

  const glyphs = "_/ *".split('');
  // return text;
  return random.pick(glyphs)
}

// cant turn on animate as that would update on every frame, hence it would be better to use async
const onKeyUp = async (e) => {
  text = e.key;
  manager.render();
}
// document.addEventListener('keyup', onKeyUp)

// Load an image
let url = 'https://pbs.twimg.com/media/Fnzb8zmagAc7nAu?format=jpg&name=medium'
const loadAnImage = async (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
    image.src = url;
    image.setAttribute('crossOrigin', 'anonymous');
  })
}

// Wrap canvasSketch in an async function so we can use await to load the key 
const start = async () => {
  // image.crossOrigin = 'anonymous';
  image = await loadAnImage(url);
  manager = await canvasSketch(sketch, settings);
}
start();
// canvasSketch(sketch, settings);