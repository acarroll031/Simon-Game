///Browser: Chrome Version 122.0.6261.112 (64-bit)
///Operating System: Windows 11

var timeInterval;
var seqList = [];
var inputList = [];
var inputAllowed = false;
var n, x;
var round;
var counter;
var random;
var inputTimeout;
var highScore = 0;
var recentScore;
var gameOn = false;

///// Green = 1, Red = 2, Yellow = 3, Blue = 4 /////

////Method to start game when button is pressed
function startButtonPress(){

  if(!gameOn) //Allows the function to run only if there isnt already a game running
  {
    gameOn = true; //Turns game on variable to true

    //Change indicator button to green
    document.querySelector('#actionindicator').style.backgroundColor = 'rgb(0, 200, 0)';
  
    //Reset variables
    timeInterval = 1000;
    round = 0;
    seqList = [];
    inputList = [];
    recentScore = 0;
  
    setTimeout(newRound, 1500);//Delay is 1500 as a delay of 1500 is added later to create time between flashes and input (totals 300)
  }
}

////Method for creating a new round
function newRound() {
  round++; //Incrament the round number

  //At the start of each new round, push a new random number into the list
  random = Math.floor(Math.random() * 4) + 1;
  seqList.push(random);

  //Set the counter equal to the length of the list -1
  counter = 0;

  setTimeout(simonRound,1500); //To add a small delay between the inputs and the next round
}

////Method starts the sequence flashing
function simonRound() {
  
  //If the end of the round hasnt been reached
  if(counter < seqList.length)
  {
    var current = seqList[counter]; //Set variable to the current item in the list

    if(counter > 5)//After 5 signals the time interval decreases
    {
      timeInterval -= 250;
    }
    if(counter > 9)//After 9 signals the time interval decreases further
    {
      timeInterval -= 250;
    }
    if(counter > 13)//After 13 signals the time interval decreases further
    {
      timeInterval -= 250;
    }

    switch(current) //Take in number of button in the sequence and flash the corresponding button
      {
        case 1:
          flashGreenON(timeInterval/2);//timeInterval/2 allows for the flashing to speed up with the round speed up (half ON half OFF)
          break;  
        case 2:
          flashRedON(timeInterval/2);
          break;
        case 3:
          flashYellowON(timeInterval/2);
          break;
        case 4:
          flashBlueON(timeInterval/2);
          break;
      }
      counter++; //Increase the counter to move to the next item in the list


      setTimeout(simonRound, timeInterval) //Run the method again with a delay in between
      timeInterval = 1000; //Reset time interval at the start of each signal
  }
  else //When the current sequence is finished
  {
    inputAllowed = true; //Allow input
    inputList = []; //Reset the input list
    n = 0; //Reset the current item variable

    //Start the 5s timeout for when the game is over if no buttons are pressed
    inputTimeout = setTimeout(lostRound,5000);
  }
}

////Method called when the buttons are clicked
function buttonPress(x) {

  //When input is allowed
  if(inputAllowed === true)
  {
    //Push the buttons number onto the input array
    inputList.push(x);
    //Call buttonCheck to see if the correct button was pressed
    buttonCheck();
    //Move to the next item in the array
    n++;

    switch(x) //Take in number of button being pressed and flash the corresponding button
      {
        case 1:
          flashGreenON(500);
          break;
        case 2:
          flashRedON(500);
          break;
        case 3:
          flashYellowON(500);
          break;
        case 4:
          flashBlueON(500);
          break;
      }
  }
}

////Function to check the last inputted button press against the sequence
function buttonCheck() {

  if(!(inputList[n] == seqList[n]))//If the number input is not the same as the number in the sequence
  {
    //Stop timeout
    clearTimeout(inputTimeout);
    //End game
    lostRound();
    //Stop allowing inputs
    inputAllowed = false;
  }
  else if(n == seqList.length-1) //When the last part of the current sequence is reached 
  {
    //Stop timeout
    clearTimeout(inputTimeout);
    //Start a new round
    newRound();
    //Stop allowing inputs
    inputAllowed = false;
    //Increase the score
    recentScore++;

    //If the recent score is greater than the highscore, replace the highscore
    if(recentScore > highScore)
    {
      highScore = recentScore;
    }

    //Change the html elements
    document.querySelector('#lastscore').innerText = recentScore;
    document.querySelector('#highscore').innerText = highScore;

  }
  else //Reset 5s timeout each time a button is pressed
  {
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(lostRound,5000);
  }
}

////Function that ends game
function lostRound() {
  //Changes indicator light to red
  document.querySelector('#actionindicator').style.backgroundColor = 'rgb(200, 0, 0)';

  //Resets recent score and updates html element
  recentScore = 0;
  document.querySelector('#lastscore').innerText = recentScore;

  //Resets counter variable x to 0 and starts the flashAll method
  x = 0;
  flashAll();

  gameOn = false; //Sets game to not running to allow the start button to work again;

}

////Function to flash all buttons at the same time for a set number of times
function flashAll() {

  //Flash buttons
  flashGreenON(300);
  flashRedON(300);
  flashYellowON(300);
  flashBlueON(300);

  //Increment counter
  x++;

  //Repeat 5 times 
  if(x < 5)
  {
    setTimeout(flashAll, 600);//Repeat the flashAll method with a 0.6s delay
  }
  
}

////Functions for flashing each button

//Green
function flashGreenON(time) {
    setTimeout(flashGreenOFF,time);
    document.querySelector('#green').style.backgroundColor = 'rgb(128,128,128)';
}

function flashGreenOFF() {
  document.querySelector('#green').style.backgroundColor = 'rgb(0,200,0)';
}

//Red
function flashRedON(time) {
  setTimeout(flashRedOFF,time);
  document.querySelector('#red').style.backgroundColor = 'rgb(128,128,128)';
}

function flashRedOFF() {
document.querySelector('#red').style.backgroundColor = 'rgb(200,0,0)';
}

//Yellow
function flashYellowON(time) {
  setTimeout(flashYellowOFF,time);
  document.querySelector('#yellow').style.backgroundColor = 'rgb(128,128,128)';
}

function flashYellowOFF() {
document.querySelector('#yellow').style.backgroundColor = 'rgb(200,200,0)';
}

//Blue
function flashBlueON(time) {
  setTimeout(flashBlueOFF,time);
  document.querySelector('#blue').style.backgroundColor = 'rgb(128,128,128)';
}

function flashBlueOFF() {
document.querySelector('#blue').style.backgroundColor = 'rgb(0,0,180)';
}
