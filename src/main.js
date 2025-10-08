const Player = require('./player.js');
let playerTurn = true;
let message = "";

function gameStart(){
    const humanPlayer = new Player('human');
    const computerPlayer = new Player('computer');


    computerPlayer.placeShipsRandomly();

    return {
        humanPlayer: humanPlayer,
        computerPlayer: computerPlayer,
    };
 

};





function handlePlayerAttck(x,y){
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

module.exports = gameStart;