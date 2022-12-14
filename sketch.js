/*
 * This program sketch is copied from Even Peck's example at
 * https://editor.p5js.org/evanpeck/sketches/O7MjzPFxb
 * This is from my own learning.
 * Julia Calderone
 * 2022-09-29
 * Website can be found at: https://juliacalderone1.github.io/BouncingBall---p5js-/ 
 *
 * Revisions
 * 1. 2022-09-29: centered the text box at the top and changed the text
 *    a. I changed the text from "Hello World!" to 
 "Bouncing Balls!"
 * 2. 2022-09-29: added a textbox; tell the users to click to change the screen
 * 3. 2022-09-29: when the user clicks the screen, the color of the top box changes colors, the balls change color, the balls' direction, color, and speed changes 
 */

const BOX_WIDTH  = 200;  // textbox dimensions
const BOX_HEIGHT = 80;

var balls = [];
var sound;
var testBall;

function preload() {

  sound = loadSound("apollo11.mp3");  // preload the sound file
}

function setup() {

//  createCanvas(windowWidth, windowHeight);
  createCanvas(600,400)

  
  noStroke();
  
  //sound.play();    // play the audio file once
  sound.loop();  // play the sound file repeatedly
  
  for (var ballNum = 0; ballNum < 10; ballNum++) {
  	balls[ballNum] = new Ball();  
  }

  let y = height;
  testBall = new Ball();
  testBall.size = 50;
  testBall.ballX = 220;  // if ballX == 225, the ball just slides over the right edge
  testBall.ballY = 300;
  testBall.red = 0;
  testBall.blue = 0;
  testBall.green = 0;
  testBall.speedX = 0;
  testBall.speedY = 1.2;
}

function createBox() {
  // prepare a box first
  strokeWeight(4);
  rect(150, 0, BOX_WIDTH, BOX_HEIGHT);
  
  textSize(32);           // size of the text (pixels)
  fill(0, 102, 153);      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('Bouncing', 200, 0, BOX_WIDTH/2, BOX_HEIGHT/2);   
  text('Balls!', 200, 40, BOX_WIDTH/2, BOX_HEIGHT/2); 
  
  strokeWeight(4);
  rect(150, 325, BOX_WIDTH, BOX_HEIGHT);
  
  textSize(32);           // size of the text (pixels)
  fill(0, 10, 153);      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('Click', 200, 325, BOX_WIDTH/2, BOX_HEIGHT/2);   
   text('To', 200, 348, BOX_WIDTH/2, BOX_HEIGHT/2);   
  text('Change!', 200, 370, BOX_WIDTH/2, BOX_HEIGHT/2); 
 
 
}

function draw() {

  background(150);
  createBox();
  
  testBallMove();  // a special ball to test corner collision
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].checkForHitBox();
    balls[ballNum].moveBall();
    
    if (mouseIsPressed) {
      balls[ballNum].randomize()
  	  balls[ballNum] = new Ball(); 
    }
  }
}

function testBallMove() {
  
  testBall.display();
  testBall.checkForHitWall();
  testBall.checkForHitBox();
  testBall.moveBall();
}

class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    
    // Dictates velocity + direction
    this.speedY = random(-10, 10);
    this.speedX = random(-10, 10);
    
    this.size = random(100);
    
    // How transparent the ball is
    this.alpha = 100
    
    // RGB values for color
    this.red   = random(255);
    this.green = random(255);
    this.blue  = random(255);
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  randomize() {
    this.speedY = random(-10, 10);
    this.speedX = random(-10, 10);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.speedY = -this.speedY;  
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX = -this.speedX;  
    }
  }
  
  checkForHitBox() {
    
    let radius = this.size / 2;

//    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT) || d < radius) {
    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT)) {
      // bump into the textbox, need to reverse direction
      this.reverseBall();
    }
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
}