var minion,minionAnimation;
var obstacle,obstacleImg;
var gameState = "PLAY";
var banana,bananaImg,bananasGroup;
var superbanana,superbananaImg;
var fondo,fondoImg;
var invisible;
var miniAnimation;
var obstaclesGroup;
var score;
var saltoSound,recogerSound,perderSound;
var gameOver,gameOverImg;

function preload(){

fondoImg = loadImage("fondo para juego xd.jpg");
minionAnimation = loadAnimation("mini1.png","mini2.png");
obstacleImg = loadImage("obstaculo.png");
bananaImg = loadImage("banana xD.png");
superbananaImg = loadImage("super banana.gif");
miniAnimation = loadAnimation("mini3.png");
perderSound = loadSound("game over.mp3.mp3");
saltoSound = loadSound("salto.mp3.mp3");
recogerSound = loadSound("recoger.mp3.mp3");
gameOverImg = loadImage("game over.png")
}

function setup() {
  createCanvas(1400 , 700);

fondo = createSprite(700,300);
fondo.addImage(fondoImg);
fondo.scale = 1.25;
fondo.velocityX = -2;

invisible = createSprite(700,620,1370,30)
invisible.visible = false;
invisible.debug = false;
invisible.setCollider("rectangle",0,0,1370,40)

minion = createSprite(200,548);
minion.addAnimation("running",minionAnimation);
minion.addAnimation("collided",miniAnimation);

minion.scale = 0.25;
minion.debug = false;
minion.setCollider("rectangle",-15,0,240,420);

bananasGroup = createGroup();
obstaclesGroup = createGroup();

score = 0;


}

function draw() {
  background(0);

  if(fondo.x < 400){
    fondo.x = 700
  }

  minion.collide(invisible);

  spawnObstacle();
  spawnBanana();

  if(obstaclesGroup.isTouching(minion)){
    gameState = "end";
    minion.changeAnimation("collided",miniAnimation);
    fondo.velocityX = 0;
    perderSound.play();
  }
   
drawSprites();

 textSize(35);
  text("puntuacion: "+ score, 1100,70);

if(gameState === "PLAY"){

  if(keyDown("space")&& minion.y >= 547){  
  minion.velocityY = -14;
  saltoSound.play();
  }

  if(minion.isTouching(bananasGroup)){
    bananasGroup.destroyEach();
    score = score + 2;
    recogerSound.play();
  }

  minion.velocityY = minion.velocityY + 0.8;
  
}

else if(gameState === "end"){
  gameOver = createSprite(710,350);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.50;

  minion.velocityY = 4;
  bananasGroup.destroyEach();
  obstaclesGroup.destroyEach();

  minion.setCollider("rectangle",-15,0,420,240);

}

} 

function spawnObstacle(){

if(frameCount %65=== 0) {
    obstacle = createSprite(1410,565);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.18;
    obstacle.velocityX = -10;

    obstacle.velocityX = -(10 + score/4);

    minion.depth = obstacle.depth;
    minion.depth += 1;

    obstacle.lifetime = 415;

    obstacle.x = Math.round(random(1415,1600));

    obstacle.setCollider("rectangle",0,0,490,408);
    obstacle.debug = false;

    obstaclesGroup.add(obstacle);
}
}

function spawnBanana() {

  if(frameCount %162 === 0){
   banana = createSprite(1402,565);
   banana.addImage(bananaImg);
   banana.scale = 0.10;
   banana.velocityX = -10;

   banana.velocityX = -(10 + score/4);

   minion.depth = banana.depth;
   minion.depth += 1;

   banana.lifetime = 415;

   banana.setCollider("rectangle",0,0,200,200)
   banana.debug = false;

   bananasGroup.add(banana);

}
}


















