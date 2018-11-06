var canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 300;
var context = canvas.getContext('2d');
var circles = [];
var NUM_CIRCLES = 10;
var offset = 20;

function getText() {
  return Math.floor(Math.random() * 200 + 10);
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function getRadius() {
  var allowed = [30, 35, 45];
  return allowed[Math.floor(Math.random() * allowed.length)];
}

function getRadii() {
  var val = [];
  for (var i = 0; i < 10; i++) {
    val.push(getRadius())
  }
  return val;
}

var rad = getRadii()

function getColor() {
  var colors = ['#fc677c', '#027b8d', '#01b7be', '#24dfdd'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getPositions() {
  var pos = [];
  var biggest = 50;
  
  for (var i = 1 ; i <= 10; i++) {
     var radius = rad[i - 1];
     var diameter = radius * 2;
     pos.push([
       (i * biggest) + offset,
       (i % 2 == 0 ? biggest : i % 3 == 0 ? biggest * 3 : biggest * 4) + offset
     ])
  }
  
  return pos;
}

function Circle(x, y, radius) {
  var velocityFactor = 0.1;
  this.x = x;
  this.y = y;
  this.dx = velocityFactor;
  this.dy = velocityFactor;
  this.radius = radius;
  this.text = getText();
  this.color = getColor();
  
  this.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = this.color;
    context.stroke();
    context.fillStyle = context.strokeStyle;
    context.fill();
    context.font = "24px Arial";
    context.fillStyle = "white";
    context.fillText(this.text, this.x - 18, this.y + 8);
  }

  this.update = function() {
    if (this.x + this.radius >= canvas.width || this.x - this.radius < 0 ) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius >= canvas.height || this.y - this.radius < 0 ) {
      this.dy = -this.dy;
    }

    // move x
    this.x += this.dx;

    // move y
    this.y += this.dy;

    this.draw();
  }
}


var pos = getPositions()

for (var i = 0; i < NUM_CIRCLES; i++) {
  var radius = rad[i];
  var x = pos[i][0];
  var y = pos[i][1];
  
  circles.push(
    new Circle(x, y, radius)
  );
}


function animate() {
  requestAnimationFrame(animate);

  // Clear first
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  for (var i = 0; i < circles.length; i++) {
    for (var j = i; j < circles.length; j++) {    
      if (
        distance(circles[i].x, circles[i].y, circles[j].x, circles[j].y)
        <= circles[i].radius + circles[j].radius + offset
      ) {
        // Collision occured
        circles[i].dx = -circles[i].dx;  
        circles[j].dx = -circles[j].dx;  
        circles[i].dy = -circles[i].dy;  
        circles[j].dy = -circles[j].dy;  

        circles[i].update();
        circles[j].update();
      }
    }
  }
  
  circles[i].update();
  circles[j].update();
}

animate();