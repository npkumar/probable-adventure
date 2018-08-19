var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');
var r = Math.random() * 255;
var b = Math.random() * 255;
var g = Math.random() * 255;

var x = 200;
var y = 200;
var radius = 30;

// velocity
var dx = 5;
var dy = 5;


function animate() {
  requestAnimationFrame(animate);

  // clear first
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  context.stroke();

  if (x + radius > window.innerWidth || x - radius < 0 ) {
    dx = -dx;
  }

  if (y + radius > window.innerHeight || y - radius < 0 ) {
    dy = -dy;
  }

  // move x
  x += dx;

  // move y
  y += dy;
}

animate();