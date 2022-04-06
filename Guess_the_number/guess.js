const btnSubmit = document.getElementById("submit");
const btnReset = document.getElementById("reset");
const highOrLow = document.getElementById("high-or-low");
const guesses = document.getElementById("guesses");
const guessesRemaining = document.getElementById("guesses-remaining");
const input = document.getElementById("guess-field");
const errorMsg = document.getElementById("errorMsg");
const showNumber = document.getElementById("show-number");
const endGamePromp = document.getElementById("endgame");
let rng = generateRN();
let savedGuesses = [];
let guessCounter = 0;
let remain = 10;
guessesRemaining.innerHTML = remain; 

function generateRN(){
    const rng = Math.floor(Math.random() * 100) + 1;
    return rng;
}

btnSubmit.addEventListener("click", function(event){
    event.preventDefault();

    let guess = input.value;

    validateGuess(guess);
    compareGuess(guess, rng);
    saveGuess(savedGuesses, guess);
    countRemainingGuesses(guessCounter);
    input.value = "";
});

function validateGuess(guess){
    if(isNaN(guess)){
        errorMsg.innerHTML = "Please enter a number.";
        return false;
    }
    else if(guess < 1){
        errorMsg.innerHTML = "Please enter value, bigger than 1.";
        return false;
    }
    else if(guess > 100){
        errorMsg.innerHTML = "Please enter value, lower than 100.";
        return false;
    }
    errorMsg.innerHTML = "";
    return true;
};

function compareGuess(guess, rng){
    const validInput = validateGuess(guess);
    if (!validInput) {
        highOrLow.innerHTML = "";
        return;
    }

    if(guess > rng){
        highOrLow.innerHTML = "Lower.";
    }
    else if(guess < rng){
        highOrLow.innerHTML = "Higher.";
    }
    else if(guess = rng){
        highOrLow.innerHTML = "You guessed it.";
        endGame();
    }

};

function saveGuess(savedGuesses, guess){
    const validInput = validateGuess(guess);
    if (!validInput) {
      return;
    }
    savedGuesses.push(guess);
    guesses.innerHTML = savedGuesses; 
    guessCounter++;
};

function countRemainingGuesses(guessCounter){
    remain = 10 - guessCounter;
    guessesRemaining.innerHTML = remain; 
    if(remain === 0){
        endGame();
        return;
    }
};

function endGame(){
    input.setAttribute('disabled', true);
    btnSubmit.disabled = true;
    showNumber.innerHTML =`The number was ${rng}.`;
    endGamePromp.hidden = false;

};

btnReset.addEventListener("click", function(event){
    event.preventDefault();
    
    rng = generateRN();
    savedGuesses = [];
    guessCounter = 0;
    endGamePromp.hidden = true;

    countRemainingGuesses(guessCounter);
    guesses.innerHTML = savedGuesses; 

    input.removeAttribute("disabled");
    input.value = "";

    highOrLow.innerHTML = "";
    showNumber.innerHTML = "";

    btnSubmit.disabled = false;
});