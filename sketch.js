var trex, trex_running, trex_collided, score;
var ground, invisibleGround, groundImage, realground, cloud, cloud1, groupCloud;
var obs, obs1, obs2, obs3, obs4, obs5, obs6, groupObs;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gOver, gameOver, rstart, restart;
var cOin, coin, groupCoin;
var cpointSound, dieSound, jumpSound, coinSound;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  gOver = loadImage("gameOver.png");
  rstart = loadImage("restart.png");
  cOin = loadImage("coin.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  
  cpointSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
  coinSound = loadSound("mario-coin.mp3");

  cloud1 = loadImage("cloud.png");
  
  groundImage = loadImage("ground2.png");
}



function coins(){
  if(frameCount % 150===0){
    coin = createSprite(610,150,10,10);
    coin.addImage("COin", cOin);
    coin.velocityX = -4 -score / 50;
    coin.scale = 0.07;
    groupCoin.add(coin);
    
  }
}

function obstacle(){
  if(frameCount % 60===0){
  obs = createSprite(610, 160, 15, 25);
  obs.velocityX = -4 -score / 50;
  switch(Math.round(random(1,6))){
    case 1:obs.addImage("obst1",obs1);
    break;
    case 2:obs.addImage("obst2",obs2);
    break;
    case 3:obs.addImage("obst3",obs3);
    break;
    case 4:obs.addImage("obst4",obs4);
    break;
    case 5:obs.addImage("obst5",obs5);
    break;
    case 6:obs.addImage("obst6",obs6);
    break;
    default:break;
    }
  obs.scale = 0.5;
    groupObs.add(obs);
  }
}

function clouds(){
  if(frameCount % 80===0){
  cloud = createSprite(700, 50, 20, 20);
  cloud.velocityX = -2 -score / 50;
  cloud.y = Math.round(random(20,70));
  cloud.addImage("clou", cloud1);
  cloud.scale = 0.7;
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  groupCloud.add(cloud);
  }
}

function jump(){
  if (keyDown("space")&&(trex.y >= 151.5)) {
    trex.velocityY = -12;
    jumpSound.play();
}

  if (ground.x < 0) {
    ground.x = ground.width / 2;
}
}

function setup() {
  createCanvas(600, 200);
  score = 0;
  groupCloud = new Group();
  groupObs = new Group ();
  groupCoin = new Group();
  
  gameOver = createSprite(300,65,20,20);
  restart = createSprite(300,100,20,20);
  gameOver.scale = 0.8;
  restart.scale = 0.6;
  gameOver.addImage("GOver", gOver);
  restart.addImage("RStart", rstart);
  
  
//crea el sprite del Trex
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("trexcldd", trex_collided);
trex.scale = 0.5;
  
//crea el sprite del suelo
realground = createSprite(200,180,400,10);
realground.visible = false;
ground = createSprite(200,170,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
  
  trex.setCollider("circle",0,0,40);
  
}


function draw() {
  console.time();
  background("white");
  /*console.log(trex.y);
  console.count("Draw frame is called:");
  console.error("errorrrr");
  console.info("infoooo");
  console.warn("cuidadoooo");*/
  
  textSize (20);
  text(score, 500,30);
  


trex.collide(realground);
drawSprites();
console.timeEnd();
  
if(gamestate===PLAY){
  trex.velocityY = trex.velocityY + 0.6;
  score = score +1;
  if(score % 100===0){
    cpointSound.play();
  }
  obstacle();
  coins();
  jump();
  clouds();
  ground.velocityX = -4 -score / 50;
  groupCloud.setLifetimeEach(300);
  groupObs.setLifetimeEach(160);
  groupCoin.setLifetimeEach(160);
  gameOver.visible = false;
  restart.visible = false;
  
  if(trex.isTouching(groupCoin)){
    coinSound.play();
    groupCoin.destroyEach();
  }
  
  if(trex.collide(groupObs)){
    trex.velocityX = 0;
    trex.velocityY = 0;
    dieSound.play();
    gamestate = END;
  }

 }
  
  else if(gamestate===END){
    trex.velocityY = 0;
    trex.changeAnimation("trexcldd", trex_collided);
    groupObs.setVelocityXEach(0);
    groupCloud.setVelocityXEach(0);
    groupCoin.setVelocityXEach(0);
    ground.velocityX = 0;
    groupCloud.setLifetimeEach(-30);
    groupObs.setLifetimeEach(-16);
    gameOver.visible = true;
    restart.visible = true;
    groupCoin.setLifetimeEach(-16);
      if(mousePressedOver(restart)){
        trex.y = 160;
        ground.x = ground.width/2;
        groupCoin.destroyEach();
        groupCloud.destroyEach();
        groupObs.destroyEach();
        gamestate = PLAY;
        trex.changeAnimation("running", trex_running);
        score = 0;
    
  }
    
  }
  

  
}
