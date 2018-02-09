var strictFlag = false;
var count = 20;
var input = 0;
var buttonsDisabled = true;
var buttonsDis = false;
var seq = [];
var onFlag =  false;
var redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');


// button click code
$(".color").on("click", function(){
  if (!buttonsDisabled && !buttonsDis){

    buttonsDis = true;
    setTimeout(function(){
      buttonsDis = false;
    }, 700)

    var color = $(this).attr("id")
    lightUp(color);

    playerInput(color);
  }

})

// makes buttons light up
function lightUp(color){
  if (onFlag){
    switch(color){
      case "red":
        $("#red").css("background-color", "#ff4d4d");
        redAudio.play();
        setTimeout(function(){$("#red").css("background-color", "#cc0000"); }, 700);
        break;
      case "yellow":
        yellowAudio.play();
        $("#yellow").css("background-color", "#ffff70");
        setTimeout(function(){$("#yellow").css("background-color", "#cccc00"); }, 700);
        break;
      case "green":
        greenAudio.play();
        $("#green").css("background-color", "#33ff33");
        setTimeout(function(){$("#green").css("background-color", "#006600"); }, 700);
        break;
      case "blue":
        blueAudio.play();
        $("#blue").css("background-color", "#b3b3ff");
        setTimeout(function(){$("#blue").css("background-color", "#4d4dff"); }, 700);
        break;
    }
  }
}

// on/off switch code
$(".onSelect").on("click", function(){
  if (onFlag){
    onFlag = false;
    $("#off").css("background-color", "#008ae6")
    $("#on").css("background-color", "black")
    $("#countBox").css("color", "black");
    $("#strictYes").css("color", "black");
    $("#strictNo").css("color", "black");
  }
  else{
    onFlag = true;
    $("#on").css("background-color", "#008ae6")
    $("#off").css("background-color", "black")
    initialize();
    $("#countBox").css("color", "red");
    strictFlag = false;
    $("#strictNo").css("color", "red");
  }
});


//strict switch code
$(".strictSelect").on("click", function(){
  if (strictFlag){
    strictFlag = false;
    $("#strictYes").css("color", "black");
    $("#strictNo").css("color", "red");
  }
  else{
    strictFlag = true;
    $("#strictYes").css("color", "red");
    $("#strictNo").css("color", "black");
  }
})

//initialize
function initialize(){
  count = 0;
  seq = [];
  for (var i=0;i<20;i++){
    var temp = Math.floor(Math.random() * 4 + 1);
    switch(temp){
      case 1:
        seq.push("red");
        break;
      case 2:
        seq.push("yellow");
        break;
      case 3:
        seq.push("green");
        break;
      case 4:
        seq.push("blue");
        break;
    }
  }
  //console.log(seq);
  round();
}

//ai round
function round(){
  //win animation
  if (count > 19){
    //disables buttons
    buttonsDisabled = true;
    setTimeout(function(){
      buttonsDisabled = false;
      initialize();
    },5000);
    //beeps 3 times
    $("#countBox").html(":)");
    for (var i=0;i<=3;i++){
      winLights((i+1)*1000);
    }
  }
  else{
    //resets fields for round init
    $("#countBox").html(count+1);
    input = 0;

    //disables and enables buttons when AI moves
    buttonsDisabled = true;
    setTimeout(function(){
      buttonsDisabled = false;
    },(count+2)*1000);

    //works with timekeep to light up buttons
    for (var i=0;i<=count;i++){
      timeKeep(i,(i+1)*1000);
    }
  }
}
//timer for delayed lights
function timeKeep(num,timer){
  setTimeout(function(){
      lightUp(seq[num]);
    }, timer);
}
function winLights(timer){
  setTimeout(function(){
      lightUp("red");
      lightUp("yellow");
      lightUp("green");
      lightUp("blue");
    }, timer);
}


//player input code
function playerInput(color){
  if(color == seq[input]){
    input++;
    if (input > count){
      count++;
      round();
    }
  }
  else{
    wrong();
  }
}

//when player makes wrong move
function wrong(){
  buttonsDisabled = true;
  $("#countBox").html("X");

  if(strictFlag){
    setTimeout(function(){
        $("#countBox").html(count);
        initialize();
    },1500);
  }
  else{
    setTimeout(function(){
        $("#countBox").html(count);
        round();
    },1500);
  }
}
