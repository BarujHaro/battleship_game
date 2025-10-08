const Ship = require('./ship.js');

class Gameboard{
    constructor(){
        this.board = Array(10).fill().map(() => Array(10).fill(null));
        this.ships=[]; //array for the ships in the board
        this.missedAttacks = []; //Missed attack, to mark in the
        this.boardSize=10;
    }
    
 
    
    //Verify if the position is inside the board
InBoard(x, y, shipLength, isVertical) {
    //Generate coordinates
    const coordinates = [];
    for (let i = 0; i < shipLength; i++) {
        if (isVertical) {
            coordinates.push({ x, y: y + i });
        } else {
            coordinates.push({ x: x + i, y });
        }
    }

    //Verify each coordinate
    for (const coord of coordinates) {
        //board limits
        if (coord.x < 0 || coord.x >= this.boardSize || 
            coord.y < 0 || coord.y >= this.boardSize) {
            return false;
        }

        //ship collision
        for (const existingShip of this.ships) {
            for (const existingCoord of existingShip.coordinates) {
                if (existingCoord.x === coord.x && existingCoord.y === coord.y) {
                    return false;
                }
            }
        }
    }
    return true;
}


    //Place the ship in the board

    placeShip(ship, x, y, isVertical) {
    const coordinates = [];
    //Verify if the ship is n the board
    if (this.InBoard(x, y, ship.length, isVertical)) {
        // Generate coordinates
        for (let i = 0; i < ship.length; i++) {
            if (isVertical) {
                coordinates.push({ x, y: y + i });
            } else {
                coordinates.push({ x: x + i, y });
            }
        }
                coordinates.forEach(coord => {
            this.board[coord.x][coord.y] = ship;
        });
        // Add ship
        this.ships.push({
            ship,
            coordinates,
            hits: new Array(ship.length).fill(false) 
        });
        return true;
    }
    return false;
}

    //process the attack
    receiveAttack(x,y){
        //Verify coordinates inside the limits
        if(x<0||x>=this.boardSize||y<0||y>=this.boardSize){
            return false;
        }
        //check for hits on ships
        for(const ShipData of this.ships){
            for (let i = 0; i < ShipData.coordinates.length; i++) {
                const coord = ShipData.coordinates[i];
                
                if (coord.x === x && coord.y === y) {
                   
                    if (ShipData.hits[i]) {
                        return false; 
                    }
                
                    ShipData.hits[i] = true;
                    ShipData.ship.hit();
                    return true;
                }
            }
        }
        for (const miss of this.missedAttacks) {
            if (miss.x === x && miss.y === y) {
                return false;
            }
        }
        
        this.missedAttacks.push({ x, y });
        return false;
    }
  
    allShipsSunk() {
        return this.ships.every(shipData => shipData.ship.sunk);
    }

}
module.exports = Gameboard;