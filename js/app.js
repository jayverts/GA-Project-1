var PlayerOne; 
var Obstacles = [];
var Score;

function startGame() {
  PlayerOne = new component(30, 30, "green", 10, 120);
  PlayerOne.gravity = 0.05;
  Score = new component("30px", "Consolas", "blue", 280, 40, "text");
    GameArea.start();
}
console.log("working");

var GameArea = {
  canvas:document.createElement("canvas"),
  start:function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas,document.body.childNodes[0]);
      this.framNo = 0;
      this.interval = setInterval(updateGameArea, 20);
  },
  clear:function() {
    this.context.clearRect(0,0, this.canvas.width,this.canvas.height);
  }
}
console.log("still working");

function component(width, height, color, x, y, type) {
  this.type = type;
  this.score = 0;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.gravity = 0;
  this.gravitySpeed = 0;
  this.update = function() {
    ctx = GameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  }
  this.hitBottom = function() {
    var bottom = GameArea.canvas.height - this.height;
    if (this.y > bottom) {
        this.y = bottom;
        this.gravitySpeed = 0;
    } 
  }
  this.crashWith = 
}