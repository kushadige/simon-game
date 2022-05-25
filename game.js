const buttonColours = ['red', 'blue', 'green', 'yellow'];
const boxes = document.querySelectorAll('.box');
const header = document.querySelector('h1');
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function nextSequence(){
    header.innerText = `Level ${level++}`;

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    boxes.forEach((box) => {
        if(box.id === randomChosenColour){
            box.classList.add('flash');
            playSound(`sounds/${box.id}.mp3`);

            // Delete flash class after 200ms
            setTimeout(() => {
                box.classList.remove('flash');
            }, 200);
        }
    });
}

let fired = false;
document.addEventListener('keypress', () => {
    if(!fired){
        setTimeout(() => {
            loadEventListeners();
            nextSequence();
        }, 800);
        fired = true;
    }
});

function loadEventListeners() {
    boxes.forEach((box) => {
        box.addEventListener('click', boxClickEvent);
    });
}

function boxClickEvent(e) {
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(`sounds/${userChosenColour}.mp3`);
    e.target.classList.add('pressed');
    
    // Delete pressed class after 200ms
    setTimeout(() => {
        e.target.classList.remove('pressed');
    }, 200);

    checkAnswer(userClickedPattern.length-1);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){

            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
    
        }
    } else {
        playSound('sounds/wrong.mp3');
        document.body.classList.add('game-over');
        setTimeout(() => {
            document.body.classList.remove('game-over');
        },200);
        header.innerText = 'Game Over, Press Any Key to Restart';
        restartGame();
    }
}

function playSound(name) {
    new Audio(name).play();
}

function restartGame() {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    fired = false;
}