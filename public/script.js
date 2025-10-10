import { gameStart, humanPlaceShip, handlePlayerAttack } from "../src/main.js";

let humanBoard = [];
let computerBoard = [];
const ships = [3,3,2];
let game = null;
let currentShipIndex = 0;
let isVertical = false;

const boardsDiv = document.getElementById("boards");
const playerBoardDiv = document.getElementById("player-board");
const computerBoardDiv = document.getElementById("computer-board");
const messageDiv = document.getElementById("message");
const placeBtn = document.getElementById("place");
const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");
const changeBtn = document.createElement("button");

document.addEventListener("DOMContentLoaded", () => {
    startBtn.addEventListener("click", StartGame);
    restartBtn.addEventListener("click", RestartGame);
    placeBtn.addEventListener("click", PlaceState);
    placeBtn.style.display = "block";
    changeBtn.textContent = "🔄 Horizontal";
    changeBtn.id = "change";
    changeBtn.style.display = "none";
    changeBtn.addEventListener("click", () => {
        isVertical = !isVertical;
        changeBtn.textContent = isVertical ? "🔄 Vertical" : "🔄 Horizontal";
    });
    
});



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
            
                cell.style.backgroundColor = "blue";
                cell.style.color = "white";
              
        }

        
        const allShipsPlaced = currentShipIndex >= game.humanPlayer.ships.length;
        
        if (allShipsPlaced) {
            messageDiv.textContent = "All ships placed! Click Start to begin.";
            startBtn.disabled = false;
            disablePlayerBoardClicks();
        } else {
            messageDiv.textContent = `Place ship ${currentShipIndex + 1} of ${game.humanPlayer.ships.length}`;
            changeBtn.style.display = "block";
            messageDiv.appendChild(changeBtn);
        }
    } else {
        messageDiv.textContent = "Cannot place ship here. Try another position.";
         setTimeout(() => {
            messageDiv.textContent = `Place ship ${currentShipIndex + 1} of ${game.humanPlayer.ships.length}`;
            changeBtn.style.display = "block";
            messageDiv.appendChild(changeBtn);
         }, 3000);
    }

    //console.log(`Own board: x: ${x}, y: ${y}`);
}

function disablePlayerBoardClicks() {
    const cells = playerBoardDiv.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.removeEventListener('click', clickedPlayerCell);
        cell.style.cursor = 'default';  
    });
     
}


function clickedEnemyCell(event){
    const x = event.target.dataset.x;
    const y = event.target.dataset.y;
    event.target.style.backgroundColor = 'red';
    //event.target.style.color = 'white';
    console.log(`Enemy board: x: ${x}, y: ${y}`);
    
}

function printBoards(boardDiv, isComputer = false){
    boardDiv.innerHTML = ""; 
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;

            if (isComputer) {
 
                cell.addEventListener("click", clickedEnemyCell);
                
            } else {
              
                cell.addEventListener("click", clickedPlayerCell);
            }

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
    messageDiv.textContent = "Place the ships";
    changeBtn.style.display = "block";
    messageDiv.appendChild(changeBtn);

    game = gameStart();


    printBoards(playerBoardDiv, false);  
    printBoards(computerBoardDiv, true);  


}


function StartGame(){
    console.log("inicio00");
}


function RestartGame(){
    console.log("reinnicio");
}