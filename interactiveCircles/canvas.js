var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');

var mouse = {
  x: null,
  y: null
};

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function Circle(x, y, dx, dy, radius, r, g, b, a) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.originalRadius = radius;
  this.r = Math.floor(Math.random() * 255);
  this.g = Math.floor(Math.random() * 255);
  this.b = Math.floor(Math.random() * 255);
  this.a = a;

  this.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ', ' + this.a + ')';
    context.stroke();
  }

  this.update = function() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0 ) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0 ) {
      this.dy = -this.dy;
    }

    // move x
    this.x += this.dx;

    // move y
    this.y += this.dy;

    // mouse pointer interactivity
    if (
      mouse.x - this.x < 100 && mouse.x - this.x > -100 &&
      mouse.y - this.y < 100 && mouse.y - this.y > -100
    ) {
      this.radius += Math.random() * 3;
    } else {
      this.radius = this.originalRadius;
    }
    this.draw();
  } 
}

var circles = [];
var NUM_CIRCLES = 500;

for (var i = 0; i < NUM_CIRCLES; i++) {
  var r = Math.random() * 255;
  var b = Math.random() * 255;
  var g = Math.random() * 255;
  var a = Math.random();

  var x = Math.random() * (window.innerWidth - this.radius * 2) + radius;
  var y = Math.random() * (window.innerHeight - this.radius * 2) + radius;
  var radius = Math.random() * 30;
  var velocityFactor = 5;

  // velocity
  // decide on direction first, with random velocity
  var dx = (Math.random()  - 0.5) * velocityFactor;
  var dy = (Math.random() - 0.5) * velocityFactor;
  circles.push(
    new Circle(x, y, dx, dy, radius, r, g, b, a)
  );
}

function animate() {
  requestAnimationFrame(animate);

  // clear first
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  circles.forEach(function(circle) {
    circle.update();
  });
}

animate();

