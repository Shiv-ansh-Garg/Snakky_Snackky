let direction = {x:0 , y:0};
const foodSound = new Audio('food.mp3');
const musicSound = new Audio('BBI.mp3');//musiccc.mp3
const gameOverSound = new Audio('game-over.mp3');
const moveSound = new Audio('move.mp3');
let speed = prompt('Enter speed (ADVISED: Speed > 15)') || 18;

let score = 0;
let lastPaintTime = 0;
let snakeArray = [{x:13, y:15}];
let food = {x:6,y:7};
musicSound.play();
let hiscore = 0;

function main(cTime) {
    window.requestAnimationFrame(main);
    // console.log(cTime);
    if((cTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = cTime;
    gameEngine();
}

function isCollide(arr){
    for(let i=1;i<snakeArray.length;i++){
        if(arr[i].x===arr[0].x && arr[i].y === arr[0].y){
        return true;
        }
    }
    if(arr[0].x <=0 || arr[0].y <=0 || arr[0].x >= 40 || arr[0].y >= 40){
        return true;
    }
    return false;
}

function gameEngine() {
    //1.For the eongation of snake and the food
    if(isCollide(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        if(hiscore < score){
            hi.innerHTML = 'Hi_Score: ' + score;
            hiscore = score;
        }
        score = 0;
        scoreBox.innerHTML = 'Score: ' + score;
        direction = {x:0 , y:0};
        alert("Game Over!! Press any key to Play again");
        snakeArray = [{x:13, y:15}];
        speed = prompt('Enter speed (ADVISED: Speed > 15)') || 18;
        musicSound.play();
    }

    if(snakeArray[0].x === food.x && snakeArray[0].y === food.y){
        snakeArray.unshift({x:direction.x + snakeArray[0].x, y:snakeArray[0].y + direction.y});
        foodSound.play();
        score+=1;
        scoreBox.innerHTML = 'Score: '+ score;
        let a = 2;
        let b = 38;
        food = {x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
    }

    for(let i=snakeArray.length-2; i>=0; i--){
        snakeArray[i+1] = {...snakeArray[i]};
    }
    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;


    //2.For the updation of the snake and the food
    board.innerHTML = "";
    snakeArray.forEach((e,index)=>{
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    direction = {x:0,y:1};
    musicSound.play();
    moveSound.play();
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;  
        default:
            break;      
    }

});