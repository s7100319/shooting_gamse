//----------global value-------
var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var gbg = new Image();
var charaImg = new Image();
var charaShotImg = new Image()
var chara_size;
var fire = false;

// - const --------------------------------------------------------------------
var chara_shot_max = 10;
//var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
//var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';

//---------main----------------
window.onload = function(){

//------screen initial-------
  screenCanvas = document.getElementById("screen");
  screenCanvas.width = 512;
  screenCanvas.height = 512;

//---2d----------------------
  ctx = screenCanvas.getContext("2d")

//-------enent---------------
  screenCanvas.addEventListener("mousemove", mouseMove, true);
  screenCanvas.addEventListener("mousedown", mouseDown, true);
  window.addEventListener("keydown", keyDown, true);

//------elements-------------
  info = document.getElementById("info");

//-----chara--initial--------
  var chara = new Character();
  //chara.init(10);

  var charashot = new Array(chara_shot_max);
  for(i = 0; i < chara_shot_max; i++){
    charashot[i] = new CharacterShot();
  }

  (function(){

//-----HTML-INFO-REFRESH------
    info.innerHTML = mouse.x + ":" + mouse.y;



    chara.position.x = mouse.x;
    chara.position.y = mouse.y;



//----game background---------
    gbg.onload = function(){
      ctx.drawImage(gbg,0,0);
    }
    gbg.src = 'test.jpg';


    charaImg.onload = function(){
      ctx.drawImage(charaImg, mouse.x-(charaImg.width/2), mouse.y-(charaImg.height/2));
    }
    charaImg.src = 'chara_img.jpg';


    if(fire){
      for(i = 0; i < chara_shot_max; i++){
        if(!charashot[i].alive){
          charashot[i].set(chara.position, 3, 5)

          break;
        }
      }
      fire = false;
    }


  //  for(i = 0; i < chara_shot_max; i++){
  //    if(charashot[i].alive){
  //      charashot[i].move();

        charaShotImg.src = 'Image3.png';
        charaShotImg.onload = function(){
          for(i = 0; i < chara_shot_max; i++){
            if(charashot[i].alive){
              charashot[i].move();
              //ctx.drawImage(charaShotImg, mouse.x + (charaImg.width/2), mouse.y - (charaImg.height/2));
              ctx.drawImage(charaShotImg, charashot[i].position.x, charashot[i].position.y-(charaImg.height/2));
        }

      }
    }


//-----flag-recall----------
    if(run){setTimeout(arguments.callee, fps);}
   })();
};

function mouseMove(event){
  mouse.x = event.clientX - screenCanvas.offsetLeft;
  mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
  ck = event.keyCode;

  if(ck === 27){
    run = false;
  }
}

function mouseDown(event){
  fire = true;
}
