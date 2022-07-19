$("body").keypress(function(){
  nextSequence();
});

var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var randomChosenColour;
var level=1;



function nextSequence(){
  userClickedPattern=[];
  var randomNumber=Math.floor(Math.random()*4);
  randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut("fast").fadeIn("fast");
  assignSounds(randomChosenColour);
  animatePress(randomChosenColour);
  console.log(randomChosenColour);
  $("h1").text("Level "+level);
  level++;

}


$(".btn").on("click",function(event){
  var userChosenColour=this.id;
  userClickedPattern.push(userChosenColour);
  assignSounds(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentlevel){
  console.log(gamePattern);
  console.log(userClickedPattern);
  if(userClickedPattern[currentlevel]===gamePattern[currentlevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("failure");
    var wrongSound=new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  gamePattern=[];
  level=1;
}


function assignSounds(color){                                  //function to add sounds to different buttons based on their color.
  var sound=new Audio("sounds/"+color+".mp3");
            sound.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
