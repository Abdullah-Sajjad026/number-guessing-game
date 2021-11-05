// getting DOM Elements
const form = document.querySelector('.number-form');
const numberInput = document.querySelector('#number-input');
const guesses = document.querySelector('#guesses');
const hint = document.querySelector('#hint');
const alertBox = document.querySelector('#alertBox');
const hintPara = document.querySelector('.hint-para');
const playAgainBtn = document.querySelector('#play-again-btn');
const submitBtn = document.querySelector('.submit-btn');

// adding form event listener
form.addEventListener('submit', generateResult);

// generating global variables to be used for one time and throughout program.
const randomNumber = Math.floor(Math.random() * 100 + 1);
// logging random number for web developers
console.log(` Ah! Console log explorer, randomNumber is ${randomNumber}.`);
let guessCount = 0;
let guessList = ' ';

function generateResult(e) {
    ++guessCount;

    const userGuess = Number(numberInput.value);
    numberInput.value = '';
    guessList += `  ${userGuess}`;
    guesses.innerHTML = guessList;

    if (userGuess === randomNumber) {
        if (guessCount < 11)
            gameWon();

    } else {
        if (guessCount > 9) {
            gameLost();
        } else {
            //changing alertBox
            alertBox.textContent = '⛔ Wrong Guess';
            alertBox.classList.replace('alert-dark', 'alert-warning');

            // modifying hint
            hintPara.classList.remove('d-none');
            if (userGuess > randomNumber) {
                hint.textContent = '📈 High';
            } else if (userGuess < randomNumber) {
                hint.textContent = '📉 Low';
            }
        }
    }
    e.preventDefault();
}

function gameWon() {
    // changing body bg color
    document.querySelector('body').classList.replace('bg-light', 'bg-success')
    //changing alertBox
    alertBox.textContent = '🎉 Correct Number'
    if (alertBox.classList.contains('alert-warning')) {
        alertBox.classList.replace('alert-warning', 'alert-success');
    } else {
        alertBox.classList.replace('alert-dark', 'alert-success');
    }
    // modifying hint
    if (!(hintPara.classList.contains('d-none'))) {
        hintPara.classList.add('d-none');
    }

    // disabling input
    numberInput.setAttribute('disabled', '');
    submitBtn.setAttribute('disabled', '');
    // displaying playAgainBtn
    playAgainBtn.classList.remove('d-none');
    playAgainBtn.addEventListener('click', () => window.location.reload());
}

function gameLost() {
    //changing alertBox
    alertBox.textContent = '🔒 10 turns completed.';
    alertBox.classList.replace('alert-warning', 'alert-danger');

    // modifying hint
    hintPara.classList.add('d-none');

    // disabling input
    numberInput.setAttribute('disabled', '');
    submitBtn.setAttribute('disabled', '');
    // displaying playAgainBtn
    playAgainBtn.classList.remove('d-none');
    playAgainBtn.addEventListener('click', () => window.location.reload());
}