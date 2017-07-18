var Bird; 
var Obstacles = [];
var Background;
var Score;

//starting the scoreboard and putting the bird on the page upon loading the game.
function startGame() {
  Bird = new component(30, 30,"img/blue-bird-sm.svg", 10, 120, "image");
  Bird.gravity = 0.05;
  Background = new component(656, 270, "img/Background.jpg", 0, 0, "image");
  Score = new component("30px", "Consolas", "yellow", 280, 40, "text");
    Sky.start();
}
//console.log("working");

//recording the high score.
var highScore = localStorage.getItem("highScore");

if(highScore !== null){
    if (Score > highScore) {
        localStorage.setItem("highScore", Score);      
    }
}
else{
    localStorage.setItem("highScore", Score);
}

//adding the functions and parameters for all new components.
function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
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
    ctx = Sky.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else if (this.type == "text") {
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
    this.hitTop();
  }
  this.hitBottom = function() {
    var bottom = Sky.canvas.height - this.height;
    if (this.y > bottom) {
        this.y = bottom;
        this.gravitySpeed = 0;
    } 
  }
  //adding a top barrier so the birds can't fly out.
  this.hitTop = function() {
    var top = Sky.canvas.height;
    if (this.y < height) {
        this.y = height;
        this.gravitySpeed = 0;
  }
}

  //setting up the losing state. If bird comes in contact with the obstacle it will return crash.
  this.crash = function(tree) {
    var myleft =this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = tree.x;
    var otherright = tree.x + (tree.width);
    var othertop = tree.y;
    var otherbottom = tree.y + (tree.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
        crash = false;
    }
    return crash;
  }
}
//console.log ("still still still working");

//setting up canvas to update al new obstacles and the width and height of the canvas board.
var Sky = {
  canvas:document.createElement("canvas"),
  start:function() {
    this.canvas.width = 750;
    this.canvas.height = 650;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas,document.body.childNodes[0]);
      this.frameNo = 0;
      this.interval = setInterval(updateSky, 20);
  },
  clear:function() {
    this.context.clearRect(0,0, this.canvas.width,this.canvas.height);
  }
}
//console.log("still working");

//losing function.
function updateSky() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < Obstacles.length; i+= 1) {
    if (Bird.crash(Obstacles[i])) {
      alert("SQUUUUUUUISH! Play again?");
      window.location.reload(); 
  }
}
  Sky.clear();
  Sky.frameNo += 1;
  if (Sky.frameNo == 1 || everyinterval(150)) {
    x = Sky.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap-minGap + 1) + minGap);
    Obstacles.push(new component(60, height, "img/spaceship.png", x, 0, "image"));
    Obstacles.push(new component (60, x - height - gap, "img/scarytree2.png", x, height + gap, "image"));
  }
  for (i = 0; i < Obstacles.length; i += 1) {
    Obstacles[i].x += -1;
    Obstacles[i].update();
  }
  Score.text ="SCORE: " + Sky.frameNo;
  Score.update();
  Bird.newPos();
  Bird.update();
}
//console.log("still still still still working");

function everyinterval(n) {
  if ((Sky.frameNo / n) % 1 == 0) {return true;}
  return false;
}

//function that allows the bird to fly when the space bar is press and sink when it is no longer pushed
function fly(e) {
  if (e.keyCode == 32) {
  Bird.gravity = -0.2;
  Sky.width = Sky.width;
 } 
}

function sink(e) {
  if (e.keyCode == 32) { 
  Bird.gravity = 0.05;
  Sky.width = Sky.width;
 }
}
document.onkeydown = fly;
document.onkeyup = sink;