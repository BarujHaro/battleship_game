
import { updateComputerAttackOnUI } from "./scripts/BoardUI.js";
import { showMessage } from "./scripts/messageUI.js";
import { GameController } from "./scripts/controller.js";
import { addMusicEvents } from "./scripts/musicUI.js";
 
document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audioPlayer");
    addMusicEvents(audioPlayer);
    //Boards
    const boardsDiv = document.getElementById("boards");
    const playerBoardDiv = document.getElementById("player-board"); 
    const computerBoardDiv = document.getElementById("computer-board");
    //Messages
    const messageDiv = document.getElementById("message");
    const ship_poseDiv = document.createElement("div");
    //Buttons

    
    const buttons = {
        placeBtn: document.getElementById("place"),
        startBtn: document.getElementById("start"),
        restartBtn: document.getElementById("restart"),
        changeBtn: document.createElement("button")
    };


    buttons.changeBtn.textContent = "🔄 Horizontal";
    buttons.changeBtn.id = "change";

    const controller = new GameController(boardsDiv, playerBoardDiv, computerBoardDiv, buttons, messageDiv, ship_poseDiv);

    buttons.startBtn.addEventListener("click", () => controller.StartGame());
    buttons.restartBtn.addEventListener("click", () => controller.RestartGame());
    buttons.placeBtn.addEventListener("click", () => controller.PlaceState());
    buttons.changeBtn.addEventListener("click", () => controller.toggleShipOrientation());


    controller.initializeUI();

    document.addEventListener('computerAttack', (event) => {
        const { x, y, hit } = event.detail;
        updateComputerAttackOnUI(x, y, hit, controller.playerBoard, controller.gameOver);
    });

    document.addEventListener('ComputerWin', (event) => {
        const { message } = event.detail; 
        showMessage(message);
        controller.disableBoards();
        controller.gameOver = true;
    });

    document.addEventListener('PlayerWin', (event) => {
        const { message } = event.detail; 
        showMessage(message);
        controller.disableBoards();
         controller.gameOver = true;
    });

    
});
 





 
