import Player from './player.js';
let playerTurn = true;
let currentShipIndex = 0;
let message = "";
let humanPlayer, computerPlayer; 


export function gameStart(){
    humanPlayer = new Player('human');
    computerPlayer = new Player('computer');


    computerPlayer.placeShipsRandomly();

        // 🧩 Aquí ves cómo quedaron los barcos de la computadora
    console.log("=== Computadora colocó sus barcos ===");
    console.log(computerPlayer.gameboard.ships); // muestra cada barco y sus posiciones
    console.log(computerPlayer.gameboard.board); // si tienes una matriz 10x10 puedes ver dónde están


    return {
        humanPlayer: humanPlayer,
        computerPlayer: computerPlayer,
    };
 

};



export function humanPlaceShip(x, y, isVertical, humanPlayer) {
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
    const attackResult = humanPlayer.attack(computerPlayer.gameboard,x,y);
    

    if (computerPlayer.gameboard.allShipsSunk()) {
        message='¡You win!';
        return;
    }

    playerTurn = false;
    setTimeout(handleComputerTurn, 1000);
}

function handleComputerTurn() {
    const attackResult = computerPlayer.attack(humanPlayer.gameboard);
   

    if (humanPlayer.gameboard.allShipsSunk()) {
        message='You lose';
        return;
    }

    playerTurn = true;


    
}


function resetGame() {
    const { humanPlayer, computerPlayer } = gameStart();
    playerTurn = true;
    message = "Nuevo juego iniciado";
    return { humanPlayer, computerPlayer };
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

//module.exports = gameStart;