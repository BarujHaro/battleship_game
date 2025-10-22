import Player from './player.js';
let playerTurn = true;
let currentShipIndex = 0;
let message = "";
let humanPlayer, computerPlayer; 
 

export function gameStart(){
    humanPlayer = new Player('human');
    computerPlayer = new Player('computer');


    computerPlayer.placeShipsRandomly();

        
    console.log("=== Computadora colocó sus barcos ===");
    console.log(computerPlayer.gameboard.ships);  
    console.log(computerPlayer.gameboard.board);  


    return {
        humanPlayer: humanPlayer,
        computerPlayer: computerPlayer,
    };
 

};



export function humanPlaceShip(x, y, isVertical) {
    if (currentShipIndex >= humanPlayer.ships.length) return false;
       
    const placed = humanPlayer.placeShip(currentShipIndex, x, y, isVertical);
    let result=null;
    if (placed) {
   
        result = {
            placed,
            currentShipIndex
        };
        currentShipIndex++;
    }
    

    return result;
}


export function handlePlayerAttack(x,y){
    if (!playerTurn) return;
    const hit = humanPlayer.attack(computerPlayer.gameboard,x,y);
        console.log(` Player attacked (${x}, ${y}) → ${hit ? "HIT!" : " MISS"}`);
    


    if (computerPlayer.gameboard.allShipsSunk()) {
        message='¡You win!';
       
        const playerWinEvent = new CustomEvent('PlayerWin', {
            detail: { message }
            });
        document.dispatchEvent(playerWinEvent);
        return true;

    }

    playerTurn = false;
    setTimeout(handleComputerTurn, 800);
    if (hit){
        return true;
    }
    
}

function handleComputerTurn() {
    const attackResult = computerPlayer.attack(humanPlayer.gameboard);
     const { x, y } = attackResult.coordinates;
    const hit = attackResult.result;

  
    const computerAttackEvent = new CustomEvent('computerAttack', {
        detail: {
            x: x,
            y: y,
            hit: hit
        }
    });
    document.dispatchEvent(computerAttackEvent);

    if (humanPlayer.gameboard.allShipsSunk()) {
        message='¡You Lose!';
       
        const ComputerWinEvent = new CustomEvent('ComputerWin', {
            detail: { message }
            });
        document.dispatchEvent(ComputerWinEvent);
        return;

    }



    playerTurn = true;
   

    
}


export function resetGame() {
    playerTurn = true;
    resetShipIndex();
    message = "";
}

export function resetShipIndex() {
    currentShipIndex = 0;
}



export default {
  gameStart,
  humanPlaceShip,
  handlePlayerAttack,
  handleComputerTurn,
  resetGame
};
