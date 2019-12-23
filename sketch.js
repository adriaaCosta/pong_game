let xBall = 300;
let yBall = 200; 
let diameter = 20;
let raio = diameter / 2; 

let velocityXBall = 6; 
let velocityYBall = 6;

let xRacket = 5;
let yRacket = 150;
let lengthRacket = 10;
let heigthRacket = 90;

let collided = false;

//oponente
let xRacketOpponent = 585;
let yRacketOpponent = 150;
let errorOpponent = 0;

let velocityYOpponent;

let myScore = 0;
let scoreOpponent = 0;

let chanceOpponentBall = 0;

// sound
let trilha;
let ponto;
let raquetada;

function preload(){
  music = loadSound("music.mp3");
  score = loadSound("score.mp3");
  racket = loadSound("racket.mp3");
}

function setup() {
  createCanvas(600, 400);
  music.loop();
  
}

function draw() {
  background(75);
  showBall();
  moveBall();
  collision();
  showRacket(xRacket, yRacket);  
  moveMyRacket();
  collisionRacketLibrary(xRacket, yRacket);
  showRacket(xRacketOpponent, yRacketOpponent);  
  collisionRacketLibrary(xRacketOpponent, yRacketOpponent);
  moveRacketOpponent();
  scoreboard();
  scored();
  
}

function showBall(){
  circle(xBall, yBall, diameter);
}

function moveBall(){
  xBall += velocityXBall;
  yBall += velocityYBall;
}

function collision(){
  if(xBall + raio > width || xBall - raio < 0){
    velocityXBall *= -1;
  }
  if(yBall + raio > height || yBall - raio < 0){
    velocityYBall *= -1;
  }
}

function showRacket(x, y){
  rect(x, y, lengthRacket, heigthRacket);
}


function moveMyRacket(){

  if (keyIsDown(UP_ARROW)){
    yRacket -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRacket += 10;
  }
}


function collisionRacketLibrary(x, y){
  collided = 
  collideRectCircle(x, y, lengthRacket, heigthRacket, xBall, yBall, raio);  
  if(collided){
    velocityXBall *= -1;
    racket.play();
  }
}

function moveRacketOpponent(){
 
  velocityYOpponent = yBall - yRacketOpponent - lengthRacket / 2 - chanceOpponentBall;
  yRacketOpponent += velocityYOpponent;
  
  if(scoreOpponent > myScore){
       chanceOpponentBall = 100;
  }
  
  if(scoreOpponent < myScore && chanceOpponentBall > 50)
  {
    chanceOpponentBall -= 3;
  }
  
}

function scoreboard(){
  stroke('white');
  textAlign(CENTER);
  textSize(16); 
  
  fill(235, 168, 52);
  rect(150, 10, 40, 20);
  fill(255);
  text(myScore, 170, 26); 
  
  fill(235, 168, 52);
  rect(450, 10, 40, 20);
  fill(255);
  text(scoreOpponent, 470, 26);
  
}

function scored(){
  if( (xBall + raio) > (width-1)){
    myScore += 1;
    score.play();
  }
  if((xBall -raio) < 1){
    scoreOpponent +=1;   
    score.play();
  }
}


