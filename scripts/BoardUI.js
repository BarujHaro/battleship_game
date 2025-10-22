import { humanPlaceShip, handlePlayerAttack } from "../src/main.js";
import { showMessage } from "./messageUI.js";


export function CleanDiv(container){
    container.innerHTML = "";
}

export function ChangeStyle(element, styles){
    element.style.display = styles;
}

export function ChangeEnable(element, disabled = true){
    element.disabled = disabled;
}

function ship_pose_style(ship_poseDiv, isVertical){
    ChangeStyle(ship_poseDiv, "flex");
    ship_poseDiv.style.justifyContent = "center";
    ship_poseDiv.style.alignItems = "center";
    ship_poseDiv.style.gap = "6px"; 
    ship_poseDiv.style.margin = "1rem auto 0 auto";
    ship_poseDiv.style.flexDirection = isVertical ? "column" : "row";
}

export function ship_changer(ship_poseDiv, isVertical, ships, currentShipIndex, messageDiv){
    CleanDiv(ship_poseDiv);
    ship_pose_style(ship_poseDiv, isVertical);
    const size = ships[currentShipIndex];
    for (let i = 0; i < size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("ship-cell");
        ship_poseDiv.appendChild(cell);
    }
    messageDiv.appendChild(ship_poseDiv);
}

export function ChangeBoardClicks(boardDiv, funct, curStyle ){
    const cells = boardDiv.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', funct);
        cell.style.cursor = curStyle;  
    });
}


export function clickedPlayerCell(event, controller) {
    const x = parseInt(event.target.dataset.x);  
    const y = parseInt(event.target.dataset.y);  
    const placed = humanPlaceShip(x, y, controller.isVertical);
    
    if (placed) {
        const shipCell = controller.ships[controller.currentShipIndex];
        controller.currentShipIndex = placed.currentShipIndex + 1;

        for (let i = 0; i < shipCell; i++) {
            let cellX, cellY;
            
            if (controller.isVertical) {
                cellX = x;
                cellY = y + i;
            } else {
                cellX = x + i;
                cellY = y;
            }
        
            const cell = controller.playerBoard.querySelector(`.cell[data-x="${cellX}"][data-y="${cellY}"]`);
            colorCell(controller.playerBoard, cellX, cellY, "#1d58c7ff");
        }

        const allShipsPlaced = controller.currentShipIndex >= controller.game.humanPlayer.ships.length;
        
        if (allShipsPlaced) {
            showMessage(`All ships placed! Click Start to begin.`); 
    
             ChangeEnable(controller.startB, false);
 
            ChangeStyle(controller.ship_poseD, "none");
            disablePlayerBoardClicks(controller);
            CleanDiv(controller.ship_poseD);
        } else {
            showMessage(`Place ship ${controller.currentShipIndex + 1} of ${controller.game.humanPlayer.ships.length}`); 
            ChangeStyle(controller.changeB, "block");
            ChangeStyle(controller.ship_poseD, "grid");
            controller.messageD.appendChild(controller.changeB);
            ship_changer(controller.ship_poseD, controller.isVertical, controller.ships, controller.currentShipIndex, controller.messageD);
        }
    } else { 
        showMessage(`Cannot place ship here. Try another position.`); 
        setTimeout(() => {
            showMessage(`Place ship ${controller.currentShipIndex + 1} of ${controller.game.humanPlayer.ships.length}`); 
            ChangeStyle(controller.changeB, "block");
            ChangeStyle(controller.ship_poseD, "grid");
            controller.messageD.appendChild(controller.changeB);
        }, 3000);
    }
}


function disablePlayerBoardClicks(controller) {
    ChangeBoardClicks(controller.playerBoard, (event) => {
      
        
    }, 'default');
}

export function printBoards(boardDiv, isComputer = false){
 
    CleanDiv(boardDiv);
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




export function colorCell(boardDiv, x, y, color) {
  const cell = boardDiv.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
  if (cell) cell.style.backgroundColor = color;
}

 
  
export function updateComputerAttackOnUI(x, y, hit, playerBoardDiv, gameOver) {
    const cell = playerBoardDiv.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    if (cell) {
        if (gameOver) return;
   
        if(hit){
            colorCell(playerBoardDiv, x, y, '#c83120ff');
        }else{
            colorCell(playerBoardDiv, x, y, '#95a5a6');
        }
       
 
    }
}


 
export function clickedEnemyCell(event, controller){
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    let hit = handlePlayerAttack(x,y);
    
    event.target.style.color = 'white';
    event.target.removeEventListener('click', controller.boundClickedEnemyCell);
    event.target.style.cursor = 'default';  
    
    //console.log(`Enemy board: x: ${x}, y: ${y}`);
    if(hit){
         
         colorCell(controller.computerBoard, x, y, '#cb2f1dff');
        
        if (controller.gameOver) return;
        showMessage(`HIT!`); 
    }else{
        showMessage(`MISS`); 
     colorCell(controller.computerBoard, x, y, '#95a5a6');
         
    }
    
}
 



