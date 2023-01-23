const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 512, 512 ],
  animate: true,
};

/* 
// How to do animate yourself
const animate = () => {
  console.log('animate');
  // requestAnimationFrame(functionToBePassedToAnimate);
  requestAnimationFrame(animate);
} */

const sketch = ({ context, width, height }) => {

  const agents = [];

  for (let index = 0; index < 20; index++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y));
  }


  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // const agentA = new Agent(256, 256);
    // const agentB = new Agent(128, 128);

    // context.arc(pointB.x, pointB.y, pointB.radius, 0, Math.PI * 2);
    // context.fillStyle = 'black';
    // context.fill();

    for(let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for(let j = i + 1; j < agents.length; j++) {
        const other = agents[j];
        const distance  = agent.pos.getDistance(other.pos);

        if (distance > 128) continue;

        context.lineWidth = math.mapRange(distance, 0, 128, 4, 0.1);

        context.beginPath()
        context.moveTo(agent.pos.x, agent.pos.y)
        context.lineTo(other.pos.x, other.pos.y)
        context.stroke()

      }
    }

    agents.forEach(agent => {
      agent.update(); // after adding this it doesn't animate this is because we are only drawing 1 frame. this will be specified in settings
      agent.bounce(width, height);
      agent.wrap(width, height);
      agent.draw(context);
    })


  };
};

canvasSketch(sketch, settings);


class Vector {
  // constructor is a special method that is called when a new instance of the class is created
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  getDistance(vector) {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x,y)
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1))
    this.radius = random.range(4, 12)

  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  wrap(width, height) {
    if (this.pos.x <= 0) this.pos.x = width;
    if (this.pos.x >= width) this.pos.x = 0;
    if (this.pos.y <= 0) this.pos.y = height;
    if (this.pos.y >= height) this.pos.y = 0;
  }

  // reference to canvas context to target where to draw
  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y )
    // context.lineWidth = random.range(1, 4);
    context.lineWidth = 2;
    // context.fillStyle = 'black';

    
    context.beginPath();
    context.arc(0,0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}