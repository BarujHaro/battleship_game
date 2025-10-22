import Gameboard from './gameboard.js';
import Ship from './ship.js';
 
export default class Player {
    constructor(type='human'){
        this.type = type; //Type of player
        this.gameboard = new Gameboard(); //Board of the player 
        this.previousAttacks = []; //register for previous attacks
        this.ships = this.createDefaultShips();
    }

        createDefaultShips() {
        return [
            new Ship(3), // Crucero
            new Ship(3), // Submarino
            new Ship(2)  // Destructor
        ];
    }
    //place ship
    placeShip(shipIndex, x, y, isVertical) {
         
        if (shipIndex < 0 || shipIndex >= this.ships.length) {
            return false;
        }
        
        const ship = this.ships[shipIndex];
         
        const result = this.gameboard.placeShip(ship, x, y, isVertical);
         
        return result;
    }

    // Coloca todos los barcos aleatoriamente (para computadora)
    placeShipsRandomly() {
        this.ships.forEach(ship => {
            let placed = false;
            while (!placed) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const isVertical = Math.random() > 0.5;
                placed = this.gameboard.placeShip(ship, x, y, isVertical);
                //console.log(`${ship} ${x} ${y}`);
            }
        });
    }



   //Attacks the board 
attack(enemyGameboard,x,y){
    //if computer
        if (this.type === 'computer') {
            return this.computerAttack(enemyGameboard);
        }
        //If that position was attacked
        if (this.hasAttacked(x, y)) {
            return false;
        }
        //Register attack
        this.previousAttacks.push({ x, y });
        //execute attack on enemys board
        return enemyGameboard.receiveAttack(x,y);
}

computerAttack(enemyGameboard){
    let x,y;
    do{ 
        x = Math.floor(Math.random() * 10); 
        y = Math.floor(Math.random() * 10); 
    }while(this.hasAttacked(x,y));
    //Generate coordinates while it hasnt been attacked

    //Register attack
        this.previousAttacks.push({ x, y });
    //Return an object with coodinates and 
        return {
            coordinates: { x, y },
            result: enemyGameboard.receiveAttack(x, y)
        };

}

//check if has been attacked in that place
    hasAttacked(x, y) {
        return this.previousAttacks.some(attack => attack.x === x && attack.y === y);
    }





    
}
 
//module.exports = Player;