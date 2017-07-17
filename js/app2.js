var BirdOne;
var BirdTwo;
var Obstacles = [];
var Background;

//creating a function that puts the birds on the page once the page loads. Basically starting the game.
function startGame() {
  BirdOne = new component(30, 30,"img/blue-bird-sm.svg", 10, 120, "image");
  BirdOne.gravity = 0.05;
  BirdTwo = new component(30, 30,"img/bird2.png", 10, 120,"image");
  BirdTwo.gravity = 0.05;
  Background = new component(656, 270, "http://www.vectorimages.org/09/0920100513112017708.jpg", 0, 0, "image");
    Sky.start();
}
//console.log("working");

//important function here. This is setting up every new component that you add to the game. Whether it be a bird or new obstacle.
function component(width, height, color, x, y, type) {
  this.type = type;
  //making sure that canvas allows images.
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
    //adding images as obstacles.
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
  }
  this.hitBottom = function() {
    var bottom = Sky.canvas.height - this.height;
    if (this.y > bottom) {
        this.y = bottom;
        this.gravitySpeed = 0;
    } 
  }
  //this is setting up the crash function. If the birds "x,y" line up with the obstacles it will come up with a crash.
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
//console.log ("still working");

//using canvas to create the moving sky and obstacle effect.
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
//console.log("still still working");

//creating the win state. If the bird runs into one of the trees/planes it will say which one hits.
function updateSky() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  //console.log("kjahsd)");
  for (i = 0; i < Obstacles.length; i+= 1) {
    if (BirdOne.crash(Obstacles[i])) {
      alert("Purple Bird Wins! Play again?");
      window.location.reload(); 
    } else if (BirdTwo.crash(Obstacles[i])) {
      alert("Blue Bird Wins! Play again?"); 
      window.location.reload();
    }
  }
  //setting the height and width of the obstacles 
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
    Obstacles.push(new component(60, height,"img/plane2.png", x, 0, "image"));
    Obstacles.push(new component (60, x - height - gap, "img/cartoon-tree.svg", x, height + gap, "image"));
  }
  for (i = 0; i < Obstacles.length; i += 1) {
    Obstacles[i].x += -1;
    Obstacles[i].update();
  }
 
  BirdOne.newPos();
  BirdOne.update();
  BirdTwo.newPos();
  BirdTwo.update();
}
//console.log("still still still still working");

function everyinterval(n) {
  if ((Sky.frameNo / n) % 1 == 0) {return true;}
  return false;
}
var xPos = 0;
var yPos = 0;

//this is creating the same rise and sink function like in the one player game. Just works for both birds.
function fly(e) {
  if (e.keyCode == 38) {
  BirdOne.gravity = -0.2;
  Sky.width = Sky.width;
 } 
 if (e.keyCode == 65) {
  BirdTwo.gravity = -0.2;
  Sky.Width = Sky.width;
 }
}

function sink(e) {
  if (e.keyCode == 38) { 
  BirdOne.gravity = 0.05;
  Sky.width = Sky.width;
 }
 if (e.keyCode == 65) {
  BirdTwo.gravity = 0.05;
  Sky.width = Sky.width;
 }
}
document.onkeydown = fly;
document.onkeyup = sink;