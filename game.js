var buttonColors = ["red", "yellow", "blue", "green"];
var genSeqArray = [];
var userClickedSeq = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

$('div[type="button"]').click(function(event){
    playSound(event.target.id);
    animatePressedButton(event.target.id);
    userClickedSeq.push(event.target.id);
    checkAnswer(userClickedSeq.length - 1);
});

function nextSequence() {
    userClickedSeq = [];
    level++;
    $("#level-title").text("Level " + level);
    var randNum = Math.floor(Math.random() * 4);
    genSeqArray.push(buttonColors[randNum]);
    $("#"+buttonColors[randNum]).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(buttonColors[randNum]);
}

function checkAnswer(index)
{
    if(genSeqArray[index] === userClickedSeq[index]){
        if(userClickedSeq.length === genSeqArray.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("#level-title").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to restart");
        
        setTimeout(function(){
            $("#level-title").removeClass("game-over");
        }, 1000);

        level = 0;
        started = false;
        genSeqArray = [];
        userClickedSeq = [];
    }
}

function playSound(name)
{
    var audio = new Audio("/sounds/"+name+".mp3");
    audio.play();
}

function animatePressedButton(name)
{
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    }, 100);
}