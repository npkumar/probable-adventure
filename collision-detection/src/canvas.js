import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
function Circle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
}

Circle.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}

Circle.prototype.update = function() {
    this.draw()
}

// Implementation
let circle1;
let circle2;
function init() {
    circle1 = new Circle(innerWidth / 2, innerHeight / 2, 100, 'tomato')
    circle2 = new Circle(300, 300, 50, 'darkgrey')
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    circle1.update()

    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update()

    if (utils.distance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius) {
        circle1.color = 'magenta'
    } else {
        circle1.color = 'tomato'
    }
}

init()
animate()
