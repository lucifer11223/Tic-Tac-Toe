
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7};
let inputDir = { x: 0, y: 0 }; // declare inputDir here

//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine(inputDir); // pass inputDir to gameEngine
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //update snake array and food
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("Play Again, Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0; // Reset score when the game restarts
        scoreBox.innerHTML = 'Score :' + score;
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        scoreBox.innerHTML = 'Score :' + score;
        if(score>highScoreVal){
            highScoreVal = score;
            localStorage.getItem('HighScore', JSON.stringify(highScoreVal));
            HighScoreBox.innerHTML = "HighScore :" + highScoreVal;
        }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //display snake and food
    //display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//game starts here
let HighScore = localStorage.getItem('HighScoreBox');
if(HighScore === null){
    highScoreVal = 0;
    localStorage.getItem('Highscore',JSON.stringify(highScoreVal));
}
else {
    highScoreVal = JSoN.parse(HighScore);
    HighScoreBox.innerHTML = "HighSore :" + highScoreVal;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
