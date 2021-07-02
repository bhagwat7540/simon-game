
var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red" , "blue" , "green" , "yellow"];

var level = 0;

var start = "false";

function startover(){
  level = 0;
  start = "false";
  gamePattern = [];
  userClickedPattern = [];
}

$(".startbtn").click(function(){

    if(start === "false"){
    $("#level-title").text("LEVEL "+level);
    nextsequence();
    start="true";
  }

});

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkAns(userClickedPattern.length-1)

});

function checkAns(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
     console.log("success");

     if(gamePattern.length===userClickedPattern.length){
       setTimeout(function(){
         nextsequence();
       },1000);
       userClickedPattern=[];
     }
  }
  else{
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Start again!");
    startover();
  }
}

function nextsequence(){
  level++;
  $("#level-title").text("LEVEL "+level);
  var randomNumber = Math.random()*4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColor =  buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChosenColor);


}

function playsound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
