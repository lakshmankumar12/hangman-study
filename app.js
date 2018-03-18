$(document).ready(function () {
    StartUp();
});

/*::::::DOM CACHE::::::*/
$newGame = $("#newGame");
$message = $("#message");
$newGameBtn = $("#newGameBtn");
var arrLines = [ $("#letter-line0"), $("#letter-line1"), $("#letter-line2") ,$("#letter-line3"), $("#letter-line4"), $("#letter-line5"), $("#letter-line6"), $("#letter-line7"), $("#letter-line8"), $("#letter-line9") ];
var arrLetters = [ $("#letter0"), $("#letter1"), $("#letter2"), $("#letter3"), $("#letter4"), $("#letter5"), $("#letter6"), $("#letter7"), $("#letter8"), $("#letter9") ];
var arrGuesses = [ $("#guess0"), $("#guess1"), $("#guess2") ,$("#guess3"), $("#guess4") ];
var arrBodyParts = [ $("#head"), $("#torso"), $("#rightarm") ,$("#leftarm"), $("#leftleg"), $("#rightleg") ];
var arrButtons = [ $("#a"), $("#b"), $("#c"), $("#d"), $("#e"), $("#f"), $("#g"), $("#h"), $("#i"), $("#j"), $("#k"), $("#l"), $("#m"), $("#n"), $("#o"), $("#o"), $("#p"), $("#q"), $("#r"), $("#s"), $("#t"), $("#u"), $("#v"), $("#w"), $("#x"), $("#y"), $("#z") ];

/*::::::GLOBALS::::::*/
var guesses = 0;
var goodGuess = 0;
var randomWord;
var lastUsedWord;

function StartUp() {
    HideTheBody();
  	ResetPlayingField();
    HideLines();
    SetupPlayingField();
  	EnableButtons();
}

function HideTheBody() {
  	//hide the svg man body parts
  	$.each(arrBodyParts, function() {
      $(this).css('display', 'none');
    });
}

function HideLines() { 
  	//hide the good guess lines until we know how many are needed for the current game
  	$.each(arrLines, function() {
      $(this).css('display', 'none');
    });
}

function ResetPlayingField() {
  //remove all good guess letters
  $.each(arrLetters, function(i) {
    this.text('');
  });
  //remove all bad guess letters
  $.each(arrGuesses, function() {
    this.text('');
  });
  
  //reset counters and hide new game display
  guesses = 0;
  goodGuess = 0;  
  $newGame.css('visibility', 'hidden');
}

function GetRandomWord() {
  	//generate a randomID 
    var _randomID = Math.floor((Math.random() * words.length));
    
  	//find the word having an ID that matches the randomID
    var _randomWord = jQuery.grep(words, function(word) {
      return word.id === _randomID;
    }); 
  
   	return _randomWord;      
}  

function SetupPlayingField() {
	randomWord = GetRandomWord();

  //never use the same random word two times in a row
  if (randomWord[0].word === lastUsedWord) {
    //request a new random word
    SetupPlayingField();
  } else {
    //track the last random word used
    lastUsedWord = randomWord[0].word;
  }
  
	//displays a ? and line for each letter of the random word
  for (x = 0; x < randomWord[0].word.length; x++) {
    arrLines[x].css('display', 'inline');
    arrLetters[x].text("?");
  }    

}
 
function EnableButtons() {
    $.each(arrButtons, function() {
      //enable all alphabet buttons when a new game begins
      $(this).attr('disabled', false);
  });
}

$("#a, #b, #c, #d, #e, #f, #g, #h, #i, #j, #k, #l, #m, #n, #o, #p, #q, #r, #s, #t, #u, #v, #w, #x, #y, #z").on('click', function(args) {
  //determine if the user made a good or bad guess
  CheckGuess(args.currentTarget.innerText);
  //disable alphabet buttons once selected
  $(this).attr('disabled', true);
});

$($newGameBtn).on('click', function() {
  StartUp();
});

function CheckGuess(_guess) {
  var _arrLetters = randomWord[0].word.split("");
    console.log(_arrLetters);
	var _goodGuess = false;
  
  //determine if the user made a good guess
  _arrLetters.forEach(function(curr, i) {
    console.log (`got i:${i} and curr as ${curr}`);
    if (curr === _guess) {
      //show the chosen letter in its proper position (good guess)
	  arrLetters[i].text(_guess);
      _goodGuess = true;
      goodGuess++;
    } 
  });
  
  if (!_goodGuess) {
      if (guesses < 5) {
        //display the chosen letter (bad guess)
        arrGuesses[guesses].text(_guess);
      }
    	//game ends on the 6th bad guess
      arrBodyParts[guesses].css('display', 'inline');
      guesses++;
      
      if (guesses === 6) {
        GameOver("loss");
      }
  } else {
    //game ends when the entire random word is displayed
    if(goodGuess === _arrLetters.length) {
      GameOver("win");
    }
  }
}

function GameOver(_result) {
  $.each(arrButtons, function() {
    	//disable all alphabet buttons once the game ends
      $(this).attr('disabled', true);
  });
  
  if (_result === "win") {
    $message.text("You won! Play again!");
  } else {
  	$message.text("You lost. The word was " + randomWord[0].word + ". Play again!");    
  }
  
  //allow the user to start a new game
  $newGame.css('visibility', 'visible');
}

var words = [
    { "id":   1, "word": "ANNOY" },
    { "id":   2, "word": "ATTENTION" },
    { "id":   3, "word": "CALM" },
    { "id":   4, "word": "COMFORTABLE" },
    { "id":   5, "word": "CONSEQUENCES" },
    { "id":   6, "word": "CURIOUS" },
    { "id":   7, "word": "CURVE" },
    { "id":   8, "word": "DECIDE" },
    { "id":   9, "word": "DIRECTIONS" },
    { "id":  10, "word": "DISCOVER" },
    { "id":  11, "word": "DISAPPOINTED" },
    { "id":  12, "word": "EMBARRASSED" },
    { "id":  13, "word": "ENORMOUS" },
    { "id":  14, "word": "EXHAUSTED" },
    { "id":  15, "word": "EXPLORE" },
    { "id":  16, "word": "FAIR" },
    { "id":  17, "word": "FASCINATING" },
    { "id":  18, "word": "FEAST" },
    { "id":  19, "word": "FOCUS" },
    { "id":  20, "word": "FRUSTRATED" },
    { "id":  21, "word": "GIGANTIC" },
    { "id":  22, "word": "GRUMPY" },
    { "id":  23, "word": "HUGE" },
    { "id":  24, "word": "IGNORE" },
    { "id":  25, "word": "INSTEAD" },
    { "id":  26, "word": "INVESTIGA" },
    { "id":  27, "word": "INVITE" },
    { "id":  28, "word": "IMPORTANT" },
    { "id":  29, "word": "JEALOUS" },
    { "id":  30, "word": "LEADER" },
    { "id":  31, "word": "LIST" },
    { "id":  32, "word": "LISTEN" },
    { "id":  33, "word": "LOVELY" },
    { "id":  34, "word": "MEASURING" },
    { "id":  35, "word": "MISERABLE" },
    { "id":  36, "word": "MUMBLE" },
    { "id":  37, "word": "NEGATIVE" },
    { "id":  38, "word": "NERVOUS" },
    { "id":  39, "word": "NIBBLED" },
    { "id":  40, "word": "NOTE" },
    { "id":  41, "word": "NOTICE" },
    { "id":  42, "word": "OBSERVING" },
    { "id":  43, "word": "OPPOSITE" },
    { "id":  44, "word": "ORDINARY" },
    { "id":  45, "word": "POSITIVE" },
    { "id":  46, "word": "PRECIOUS" },
    { "id":  47, "word": "PREFER" },
    { "id":  48, "word": "PROBLEM" },
    { "id":  49, "word": "PROTECT" },
    { "id":  50, "word": "PROUD" },
    { "id":  51, "word": "QUESTION" },
    { "id":  52, "word": "REMINDS" },
    { "id":  53, "word": "REPEAT" },
    { "id":  54, "word": "REPORT" },
    { "id":  55, "word": "RHYME" },
    { "id":  56, "word": "RESPECT" },
    { "id":  57, "word": "SEARCHING" },
    { "id":  58, "word": "SPECIAL" },
    { "id":  59, "word": "SPOTLESS" },
    { "id":  60, "word": "SQUIRM" },
    { "id":  61, "word": "STOMPED" },
    { "id":  62, "word": "SUDDENLY" },
    { "id":  63, "word": "SUGGESTION" },
    { "id":  64, "word": "SURPRISE" },
    { "id":  65, "word": "UNCOMFORTABLE" },
    { "id":  66, "word": "WARNING" },
    { "id":  67, "word": "WONDER" },
    { "id":  68, "word": "WORRIED" }
    { "id":  69, "word": "AMULET" }
];
