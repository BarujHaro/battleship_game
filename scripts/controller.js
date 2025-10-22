import { ChangeStyle, printBoards, ChangeBoardClicks, CleanDiv, ship_changer, clickedPlayerCell, clickedEnemyCell, ChangeEnable } from "./BoardUI.js";

import { showMessage } from "./messageUI.js";
import { gameStart, resetGame } from "../src/main.js";


export class GameController {
    constructor(boardsDiv, playerBoardDiv, computerBoardDiv, buttons, messageDiv, ship_poseDiv) {
        this.messageD = messageDiv;
        this.ship_poseD= ship_poseDiv;
        this.boardsD = boardsDiv;
        this.playerBoard = playerBoardDiv;
        this.computerBoard = computerBoardDiv;
        this.placeB = buttons.placeBtn;
        this.startB = buttons.startBtn;
        this.restartB = buttons.restartBtn;
        this.changeB = buttons.changeBtn;

        this.ships = [3, 3, 2];
        this.currentShipIndex = 0;
        this.isVertical = false;
        this.game = null;
        this.gameOver = false;


        this.boundClickedPlayerCell = (event) => clickedPlayerCell(event, this);
        this.boundClickedEnemyCell = (event) => clickedEnemyCell(event, this);
    
    }

    
    initializeUI() {
        ChangeStyle(this.placeB, "block");
        ChangeStyle(this.startB, "none");
        ChangeStyle(this.changeB, "none");
        ChangeStyle(this.restartB, "none");
        ChangeStyle(this.ship_poseD, "none");
        ChangeStyle(this.boardsD, "none");
        showMessage("");
        
         
    }

    toggleShipOrientation(){
        this.isVertical = !this.isVertical;
        this.changeB.textContent = this.isVertical ? "🔄 Vertical" : "🔄 Horizontal";
        ship_changer(this.ship_poseD, this.isVertical, this.ships, this.currentShipIndex, this.messageD);
            
    }

    handlePlayerClick = (event) => {
        // 'this' siempre es correcto
        const x = parseInt(event.target.dataset.x);
        colorCell(this.playerBoard, x, y, color);
    }
    
    handleEnemyClick = (event) => {
        // 'this' siempre es correcto
        const x = parseInt(event.target.dataset.x);
        colorCell(this.computerBoard, x, y, color);
    }

    PlaceState(){
            ChangeStyle(this.placeB, "none");
            ChangeStyle(this.boardsD, "grid");
            ChangeStyle(this.startB, "block");
            ChangeStyle(this.changeB, "block");
            ChangeStyle(this.ship_poseD, "grid");
            ChangeStyle(this.messageD, "block");

            ChangeEnable(this.startB, true);
            showMessage(`Place the ships`); 
            this.messageD.appendChild(this.changeB);
            ship_changer(this.ship_poseD, this.isVertical, this.ships, this.currentShipIndex, this.messageD);
            this.game = gameStart();
            printBoards(this.playerBoard, false);  
            printBoards(this.computerBoard, true); 
            ChangeBoardClicks(this.playerBoard, this.boundClickedPlayerCell, 'pointer' ); 
            ChangeBoardClicks(this.computerBoard, this.boundClickedEnemyCell, 'default' );
            
    }

    StartGame(){

        ChangeStyle(this.placeB, "none");
        ChangeStyle(this.startB, "none");
        ChangeStyle(this.changeB, "none");
        ChangeStyle(this.restartB, "block");
        showMessage(`Attack the enemy board!`); 
 
        ChangeBoardClicks(this.computerBoard, this.boundClickedEnemyCell, 'pointer');
    }

    disableBoards(){
        //ChangeBoardClicks(this.playerBoard, clickedPlayerCell, 'default' );
        //ChangeBoardClicks(this.computerBoard, clickedEnemyCell, 'default' );
        ChangeBoardClicks(this.playerBoard, () => {}, 'default');
        ChangeBoardClicks(this.computerBoard, () => {}, 'default');
    }

    RestartGame(){
        ChangeStyle(this.placeB, "block");
        ChangeStyle(this.startB, "none");
        ChangeStyle(this.changeB, "none");
        ChangeStyle(this.restartB, "none");
        ChangeStyle(this.ship_poseD, "none");
        ChangeStyle(this.boardsD, "none");
        ChangeStyle(this.messageD, "none");
        
        showMessage(``); 
                
        CleanDiv(this.playerBoard);
        CleanDiv(this.computerBoard);
        CleanDiv(this.ship_poseD);

        this.currentShipIndex = 0;
        this.isVertical = false;
        this.game = null;


        this.disableBoards();
        resetGame();

    }






}

