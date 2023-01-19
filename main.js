import './style.css'
console.log('hello creative coding')

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

context.fillStyle = 'black';

context.lineWidth = 4;
context.beginPath();
context.rect(100, 100, 400, 400);

context.beginPath();
context.arc(300, 300, 200, 0, Math.PI * 2);

const width = 60;
const height = 60;
const gap = 20;
let x,y;

for (let index = 0; index < 5; index++) {
  for (let j = 0; j < 5; j++) {
    x = 100 + (width + gap) * index;
    y = 100 + (width + gap) * j;
    
    // draw big square
    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke();

    // Conditional to draw only if index is bigger than 0 and smaller than 4
    // if(index > 0 && index < 4) {
    //   // draw small square
    //   context.beginPath();
    //   context.rect(x + 8, y + 8, width - 16, height - 16);
    //   context.stroke();
    // }

    // Draw random small squares within larger squares
    if(Math.random() > 0.5) {
      // draw small square
      context.beginPath();
      context.rect(x + 8, y + 8, width - 16, height - 16);
      context.stroke();
    }
  }
}