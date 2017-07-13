var PlayerOne; 
var Obstacles = [];
var Score;

function startGame() {
  PlayerOne = new component(30, 30,  "smiley.gif", 10, 120, "image");
  PlayerOne.gravity = 0.05;
  Score = new component("30px", "Consolas", "blue", 280, 40, "text");
    GameArea.start();
}
console.log("working");

var GameArea = {
  canvas:document.createElement("canvas"),
  start:function() {
    this.canvas.width = 700;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas,document.body.childNodes[0]);
      this.frameNo = 0;
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
  this.crashWith = function(otherobj) {
    var myleft =this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.wdith);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
        crash = false;
    }
    return crash;
  }
}
console.log ("still still still working");

function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < Obstacles.length; i+= 1) {
    if (PlayerOne.crashWith(Obstacles[i])) {
        return;
    }
  }
  GameArea.clear();
  GameArea.frameNo += 1;
  if (GameArea.frameNo == 1 || everyinterval(150)) {
    x = GameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap-minGap + 1) + minGap);
    Obstacles.push(new component(10, height, "red", x, 0));
    Obstacles.push(new component (10, x - height - gap, "red", x, height + gap));
  }
  for (i = 0; i < Obstacles.length; i += 1) {
    Obstacles[i].x += -1;
    Obstacles[i].update();
  }
  Score.text ="SCORE: " + GameArea.frameNo;
  Score.update();
  PlayerOne.newPos();
  PlayerOne.update();
}
console.log("still still still still working");

function everyinterval(n) {
  if ((GameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

function fly(n) {
  PlayerOne.gravity = n;
}

console.log("last still working");