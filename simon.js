var gamePattern=[];
var buttonColors=["green","red","yellow","blue"];
var userClickedPattern=[];


var level=0;
var started=false;
$(document).keypress(function() {
    if(!started){
        $(".level").text("Level " + level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currLevel){
    if(gamePattern[currLevel]===userClickedPattern[currLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $(".title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern=[];
    level++;
    $(".level").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
   $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currColor){
    $("#"+currColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currColor).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}