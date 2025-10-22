import { gameStart, humanPlaceShip, handlePlayerAttack, resetGame } from "../src/main.js";
 
//Control variables
const ships = [3,3,2];
let game = null;
let gameOver = false;
let currentShipIndex = 0;
let isVertical = false;
//Boards
const boardsDiv = document.getElementById("boards");
const playerBoardDiv = document.getElementById("player-board"); 
const computerBoardDiv = document.getElementById("computer-board");
//Messages
const messageDiv = document.getElementById("message");
const ship_poseDiv = document.createElement("div");
//Buttons
const placeBtn = document.getElementById("place");
const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");
const changeBtn = document.createElement("button");

document.addEventListener("DOMContentLoaded", () => {
    startBtn.addEventListener("click", StartGame);
    restartBtn.addEventListener("click", RestartGame);
    placeBtn.addEventListener("click", PlaceState);
    placeBtn.style.display = "block";
    ship_poseDiv.style.display = "none";
    changeBtn.textContent = "🔄 Horizontal";
    changeBtn.id = "change";
    changeBtn.style.display = "none";
    changeBtn.addEventListener("click", () => {
        isVertical = !isVertical;
        changeBtn.textContent = isVertical ? "🔄 Vertical" : "🔄 Horizontal";
        ship_changer();
    });
    
});

function change_text(text){
    messageDiv.textContent = text;
}

document.addEventListener('computerAttack', (event) => {
    const { x, y, hit } = event.detail;
    updateComputerAttackOnUI(x, y, hit, playerBoardDiv);
});

document.addEventListener('ComputerWin', (event) => {
    const { message } = event.detail; 
    change_text(message);
    disablePlayerBoardClicks(); 
    disableEnemyBoardClicks();
    gameOver = true;
});


 


function updateComputerAttackOnUI(x, y, hit) {
    const cell = playerBoardDiv.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    if (cell) {
        if (gameOver) return;
        cell.style.backgroundColor = hit ? '#c0392b' : '#bdc3c7';
 
    }
}

function ship_changer(){
    ship_poseDiv.innerHTML = "";  
    ship_poseDiv.style.display = "flex";
    ship_poseDiv.style.justifyContent = "center";
    ship_poseDiv.style.alignItems = "center";
    ship_poseDiv.style.gap = "4px";
    ship_poseDiv.style.margin = "10px auto";
    //border: 1px solid #000000 
    ship_poseDiv.style.flexDirection = isVertical ? "column" : "row";

    const size = ships[currentShipIndex];

    for (let i = 0; i < size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("ship-cell");
        ship_poseDiv.appendChild(cell);
    }
    messageDiv.appendChild(ship_poseDiv);
}

function clearShipPose() {
    ship_poseDiv.innerHTML = "";
    ship_poseDiv.style.display = "none";
}
 

function enablePlayerBoardClicks() {
    const cells = playerBoardDiv.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', clickedPlayerCell);
        cell.style.cursor = 'pointer';  
    });
     
}

function disablePlayerBoardClicks() {
    const cells = playerBoardDiv.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.removeEventListener('click', clickedPlayerCell);
        cell.style.cursor = 'default';  
    });
     
}

function enableEnemyBoardClicks() {
    const cells = computerBoardDiv.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', clickedEnemyCell);
        cell.style.cursor = 'pointer';  
    });
     
}

function disableEnemyBoardClicks() {
    const cells = computerBoardDiv.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.removeEventListener('click', clickedEnemyCell);
        cell.style.cursor = 'default';  
    });
     
}



function clickedPlayerCell(event){
    const x = parseInt(event.target.dataset.x);  
    const y = parseInt(event.target.dataset.y);  

    if (!game) return;

    const placed = humanPlaceShip(x, y, isVertical, game.humanPlayer);
    
    if (placed) {
 
        const shipCell = ships[placed.currentShipIndex];
        currentShipIndex = placed.currentShipIndex+1;

        for (let i = 0; i < shipCell; i++) {
            let cellX, cellY;
            
            if (isVertical) {
                cellX = x;
                cellY = y + i;
            } else {
                cellX = x + i;
                cellY = y;
            }
        
                const cell = playerBoardDiv.querySelector(`.cell[data-x="${cellX}"][data-y="${cellY}"]`);
            
                cell.style.backgroundColor = "#3498db";
                cell.style.color = "white";
              
        }

        
        const allShipsPlaced = currentShipIndex >= game.humanPlayer.ships.length;
        
        if (allShipsPlaced) {
             change_text(`All ships placed! Click Start to begin.`); 
            
            startBtn.disabled = false;
            ship_poseDiv.style.display = "none";
            disablePlayerBoardClicks();
            clearShipPose();
            
        } else {
            
             change_text(`Place ship ${currentShipIndex + 1} of ${game.humanPlayer.ships.length}`); 
            changeBtn.style.display = "block";
              ship_poseDiv.style.display = "grid";
            messageDiv.appendChild(changeBtn);
             ship_changer();
            
        }
    } else { 
         change_text(`Cannot place ship here. Try another position.`); 
         setTimeout(() => {
            
             change_text(`Place ship ${currentShipIndex + 1} of ${game.humanPlayer.ships.length}`); 
            changeBtn.style.display = "block";
                ship_poseDiv.style.display = "grid";
            messageDiv.appendChild(changeBtn);
         }, 3000);
    }

     
}



function clickedEnemyCell(event){
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    let hit = handlePlayerAttack(x,y);
    
    event.target.style.color = 'white';
    event.target.removeEventListener('click', clickedEnemyCell);
    event.target.cursor = 'default';  
    
    //console.log(`Enemy board: x: ${x}, y: ${y}`);
    if(hit){
        event.target.style.backgroundColor = '#e74c3c';
        if (gameOver) return;
        change_text(`HIT!`); 
    }else{
        change_text(`MISS`); 
     
        event.target.style.backgroundColor = '#95a5a6';
    }
    
}
 







function printBoards(boardDiv, isComputer = false){
    boardDiv.innerHTML = ""; 
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;

        

            boardDiv.appendChild(cell);
        }
    }
}


function toggleOrientation() {
    isVertical = !isVertical;
    messageDiv.textContent = `Orientation: ${isVertical ? 'Vertical' : 'Horizontal'}`;
}


function PlaceState() {
    placeBtn.style.display = "none";
    startBtn.style.display = "block";
    startBtn.disabled = true;
    boardsDiv.style.display = "grid";
    change_text(`Place the ships`); 
 
    changeBtn.style.display = "block";
    ship_poseDiv.style.display = "grid";
    messageDiv.appendChild(changeBtn);
    ship_changer();
    game = gameStart();
    printBoards(playerBoardDiv, false);  
    printBoards(computerBoardDiv, true);  
    disableEnemyBoardClicks();
    enablePlayerBoardClicks();


}


function StartGame(){
   
    placeBtn.style.display = "none";
    startBtn.style.display = "none";
    changeBtn.style.display = "none";
    restartBtn.style.display = "block";
    change_text(`Attack the enemy board!`); 
    enableEnemyBoardClicks();


}


function RestartGame(){
    placeBtn.style.display = "block";
    startBtn.style.display = "none";
    changeBtn.style.display = "none";
    restartBtn.style.display = "none";
    change_text(``); 
    playerBoardDiv.innerHTML = "";
computerBoardDiv.innerHTML = "";
currentShipIndex = 0;
isVertical = false;
game = null;
ship_poseDiv.innerHTML = "";
ship_poseDiv.style.display = "none";
boardsDiv.style.display = "none";
disablePlayerBoardClicks();
disableEnemyBoardClicks();
 resetGame();
}