//----------global value-------
var screenCanvas, info, ca;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var gbg = new Image();
var charaImg = new Image();
var charaShotImg = new Image();
var enemyImg = new Image();
var enemyshotImg = new Image();
var bossImg = new Image();
var bitImg = new Image();
var bitShotImg = new Image();
var chara_size;
var fire = false;
var count = 0;
var message;
var score = 0;
var boss_bit_count = 5;
var bossBitPosition = new Point();
var charainfo;
var shootingGame;
var t = 1;
var gameInfo;
var audioLaser;
var audioCharaOver;
var audioEnemyDamage;
var audioEnemyshot;
var audioBossDamage;
var audioBossOver;
var sound;


// - const --------------------------------------------------------------------
var chara_shot_max = 10;
var enemy_count = 10;
var enemy_shot_count = 10;
//var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
//var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';

//---------main----------------
window.onload = function(){

  var i, j, k;
  var p = new Point();
  var cs_p = new Point();
  var c_es_p = new Point();
  //var enemy_position_random = getRndInteger(256, 462);

//------screen initial-------
  screenCanvas = document.getElementById("screen");
  screenCanvas.width = 768;
  screenCanvas.height = 512;

//-------建立假想畫面桌布-------------
  ca = document.getElementById('canvas')
  ca.width = 768;
  ca.height = 100;


//---2d----------------------
  charainfo = ca.getContext("2d")

  ctx = screenCanvas.getContext("2d")
  ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = 0;


//-------enent---------------
  screenCanvas.addEventListener("mousemove", mouseMove, true);
  screenCanvas.addEventListener("mousedown", mouseDown, true);
  window.addEventListener("keydown", keyDown, true);

//------elements-------------
  info = document.getElementById("info");

//------effect sound---------
  audioLaser = new Audio("laser2.mp3")
  audioCharaOver = new Audio("game_explosion1.mp3")
  audioEnemyDamage = new Audio("damage6.mp3")
  audioEnemyshot = new Audio("shoot4.mp3")
  audioBossDamage = new Audio("damage1.mp3")
  audioBossOver = new Audio("game_explosion7.mp3")



//-----chara--initial--------
  var chara = new Character();
  //chara.init(10);

  var boss = new Boss();

  var charashot = new Array(chara_shot_max);
  for(i = 0; i < chara_shot_max; i++){
    charashot[i] = new CharacterShot();
  }

  var enemy = new Array(enemy_count);
  for(i = 0; i < enemy_count; i++){
    enemy[i] = new Enemy();
  }

  var enemyshot = new Array(enemy_shot_count);
  for(i = 0; i < enemy_shot_count; i++){
    enemyshot[i] = new EnemyShot();
    }

  var bossbit = new Array(boss_bit_count);
  for(i = 0; i < boss_bit_count; i++){
    bossbit[i] = new Bit();
  }


  (function(){
    //count++;

function shootingGame(turn){

  count++;
//-----Opening----//

  switch(true){
    case count <70:
    message = "Ready....";
    break;

    case count <100:
    message = "GO!!!";
    break;

    default:
    message = "";
}

//-----HTML-INFO-REFRESH------//


    chara.position.x = mouse.x;
    chara.position.y = mouse.y;

//----game background---------//
    gbg.src = 'background.png';
    ctx.drawImage(gbg, 0, 0);

    charainfo.fillStyle="#000000";
    charainfo.fillRect(0, 0, 768, 100);


//----主角機圖片載入-----------------//
    charaImg.src = 'shamiko.png';
    ctx.drawImage(charaImg, mouse.x-(charaImg.width/2), mouse.y-(charaImg.height/2));


//----主角機發射子彈設定-------------//
    if(fire){
      for(i = 0; i < chara_shot_max; i++){
        if(!charashot[i].alive){
          cs_p.x = chara.position.x + 80;
          cs_p.y = chara.position.y - 25;
          charashot[i].set(cs_p, 25, 10)
          break;
        }
      }
      fire = false;
    }



//----主角機發射子彈圖片載入----------//
    charaShotImg.src = 'chara_shot.png';
    for(i = 0; i < chara_shot_max; i++){
      if(charashot[i].alive){
        charashot[i].move();

        ctx.drawImage(charaShotImg, charashot[i].position.x , charashot[i].position.y);
      }
    }


//----敵機出現管理------------------//
    if(count % 100 === 0 && count < 1000){
      for(i = 0; i < enemy_count; i++){
        var enemy_position_random_x = getRndInteger(256, 718);
        var enemy_position_random_y = getRndInteger(50, 462);
         if(!enemy[i].alive){
           j = Number(Math.floor(Math.random() * 3));
           if(j === 0){
             p.x =  screenCanvas.width + 50;
             p.y =  enemy_position_random_y;
             //p.x =  256;
             //p.y =  256;
             enemy[i].set(p, 0, j);
           }
           else if(j === 1){
             p.x = enemy_position_random_x;
             p.y = screenCanvas.height + 50;
             //p.x =  256;
             //p.y =  256;
             enemy[i].set(p, 0, j);
           }
           else if(j === 2){
             p.x = enemy_position_random_x;
             p.y = -50;
             //p.x =  256;
             //p.y =  256;
             enemy[i].set(p, 0, j);
           }
           break;
        }
      }
    }
    else if(count === 1000){
      p.x = screenCanvas.width;
      p.y = screenCanvas.height/2;
      boss.set(p, 125, 30);

    for(i = 0; i < boss_bit_count; i++){
      j = 360 / boss_bit_count;
      bossbit[i].set(boss, 50, 5, i * j)
    }
  }

//---敵機圖片載入----------------------//
    enemyImg.src = 'gosenzosama.png';
      for(i = 0; i < enemy_count; i++){
        if(enemy[i].alive){
          enemy[i].move();
          ctx.drawImage(enemyImg, enemy[i].position.x, enemy[i].position.y)

          if(enemy[i].param % Math.floor((80 / t)) === 0){
            for(j = 0; j < enemy_shot_count; j++){
              if(!enemyshot[j].alive){
                audioEnemyshot.play();
                p = enemy[i].position.distance(chara.position);
                p.normalize();
                enemyshot[j].set(enemy[i].position, p, 50, 5)
                break;
            }
           }
          }
        }
      }

//---敵機子彈圖片載入設定-----------------//
    enemyshotImg.src = 'enemy_shot.png';
    for(i = 0; i < enemy_shot_count; i++){
      if(enemyshot[i].alive){
        enemyshot[i].move();
        ctx.drawImage(enemyshotImg, enemyshot[i].position.x, enemyshot[i].position.y)
     }
    }

//---主角機發射子彈與敵機接觸時判定---------//
    for(i = 0; i < chara_shot_max; i++){
      if(charashot[i].alive){
        for(j = 0; j < enemy_count; j++){
          if(enemy[j].alive){
            c_e_p = enemy[j].position.distance(charashot[i].position)
            if(c_e_p.length() < 50){
              enemy[j].alive = false;
              charashot[i].alive = false;
              audioEnemyDamage.play();
              score += 100;

              break;
            }
          }
        }
      }
    }

//---BOSS圖片載入設定----------------------//
  bossImg.src = "momo.png";
  if(boss.alive){
    boss.move();
    ctx.drawImage(bossImg, boss.position.x, boss.position.y-100)
  }

//---BIT圖片載入設定----------------------//
  bitImg.src = "mikan.png"
  for(i = 0; i < boss_bit_count; i++){
    if(bossbit[i].alive){
      bossbit[i].move();
      ctx.drawImage(bitImg, bossbit[i].position.x , bossbit[i].position.y)

      if(bossbit[i].param % Math.floor((200 / t)) === 0){
        for(j = 0; j < enemy_shot_count; j++){
          if(!enemyshot[j].alive){
            audioEnemyshot.play();
            p = bossbit[i].position.distance(chara.position);
            p.normalize();
            enemyshot[j].set(bossbit[i].position, p, 50, 5)
            break;
          }
        }
      }
    }
  }

//---主角機發射子彈與BIT接觸時判定----------//
  //for(i = 0; i < chara_shot_max; i++){
  //  if(charashot[i].alive){
  //    for(j = 0; j < boss_bit_count; j++){
  //      if(bossbit[j].alive){
  //      p = bossbit[j].position.distance(charashot[i].position);
  //      if(p.length() < 50){
  //       bossbit[j].life--;
  //       charashot[i].alive = false;
  //       //score += 300;
  //        if(bossbit[j].life < 0){
  //          bossbit[j].alive = false;
            //charashot[i].alive = true;

  //          score += 300;
  //           }
  //           break;
  //          }
  //        }
  //      }
  //    }
  //  }

    for(i = 0; i < chara_shot_max; i++){
      if(charashot[i].alive){
        for(j = 0; j < boss_bit_count; j++){
          if(bossbit[j].alive){
          p = bossbit[j].position.distance(charashot[i].position);
          if(p.length() < 50){
           audioEnemyDamage.play();
           bossbit[j].life--;
           charashot[i].alive = false;
            if(bossbit[j].life < 0){
              bossbit[j].alive = false;

              score += 300;
               }
               break;
              }
            }
          if(boss.alive){
            p = boss.position.distance(charashot[i].position);
            if(p.length() < 100){
              audioBossDamage.play();
              boss.life--;
              charashot[i].alive = false;
              if(boss.life < 0){
                audioBossOver.play();
                score += 1000;
                for(k = 0; k < 5; k++){
                boss.alive = false;
                bossbit[k].alive = false;
               }
              }
              break;
            }
          }
        }
      }
    }

//---主角機接觸到敵機發射的子彈時判定--------//
  for(i = 0; i < enemy_shot_count; i++){
    if(enemyshot[i].alive){
      p = enemyshot[i].position.distance(chara.position)
      if(p.length() < 80){
        audioCharaOver.play();
        chara.alive = false;
        run = false;
        message = 'Game Over!!!'
        break;
      }
    }
  }



//---BOSS機與主角機接觸時判定---------------//
  //for(i = 0; i < chara_shot_max; i++){
  //if(charashot[i].alive){
  //if(boss.alive){
  //  p = boss.position.distance(charashot[i].position);
  //  if(p.length() < 50){
  //    boss.life -= 1;
  //    charashot[i].alive = false;

  //    if(boss.life < 0){
  //      score += 1000;
  //      boss.alive = false;
  //      bit.alive = false;
        //run = false;
  //      message = "Clear!!!";
  //  }
  // }
  //}
 //}
//}

//---遊戲內容資訊--------------------------//
  //info.innerHTML = "score :"+ score  + " Turn : " + t + " "+ message;
  gameInfo ="score :"+ score  + " Turn : " + t + " "+ message;

  charainfo.fillStyle = "#ffffff";
  charainfo.font="50px textBaseline ";
  charainfo.fillText(gameInfo, 0, 70, 1000)
}


var turn = 10000;
if(t < 10000){
  shootingGame(t);
  if(count > 1000 && !boss.alive){
    count = 0;
    t += 1;
    shootingGame(t);
 }
}

//-----flag-recall----------
    if(run){setTimeout(arguments.callee, fps)}

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
  if(true){
    audioLaser.pause();
    audioLaser.currentTime = 0;
    audioLaser.play();
    fire = true;
 }
}
