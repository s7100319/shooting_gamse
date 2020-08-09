function Boss(){
  this.position = new Point();
  this.size = 0;
  this.life = 0;
  this.param = 0;
  this.alive = false;
}

Boss.prototype.set = function(p, size, life){
  this.position.x = p.x;
  this.position.y = p.y;
  this.size = size;
  this.life = life;

  this.param = 0;

  this.alive = true;
}

Boss.prototype.move = function(){
  var i, j
  this.param++

  if(this.param < 150){
    this.position.x -=2;
  }
  if(this.param > 150 & this.param < 228){
    this.position.y +=2;
  }
  if(this.param > 228){
    i = ((this.param -228) % 360) * Math.PI/180;
    j = screenCanvas.height/2 - 50;
    this.position.y =  j + Math.cos(i) * j ;
  }

  //switch(true){

    //case this.param < 150:
    //this.position.x -= 2

    //break;

    //case this.param > 150:
    //this.poisition.y +=2
    //break;

    //case this.position.y = 512:
    //i = ((this.param -150) % 360) * Math.PI/180;
    //j = screenCanvas.height/2;
    //this.position.y =  Math.cos(i) * j ;
    //break;
  //}
}

function Bit(){
  this.position = new Point();
  this.parent = null;
  this.size = 0;
  this.life = 0;
  this.param = 0;
  this.alive = false;
}

Bit.prototype.set = function(parent, size, life, param){
  this.parent = parent;

  this.size = size;
  this.life = life;

  this.param = param;

  this.alive = true;
}


Bit.prototype.move = function(){
  var i, x, y;

  this.param++;

  i = (this.param % 360) * Math.PI/180;
  x = Math.sin(i) * (this.parent.size + this.size)+75;
  y = Math.cos(i) * (this.parent.size + this.size)+75;
  this.position.x = this.parent.position.x + x;
  this.position.y = this.parent.position.y + y -100;
}
