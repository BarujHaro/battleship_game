//Class ship 
class Ship {
    constructor(length) {
        this.length = length; //Length of the ship /health
        this.hits = 0; 
        this.sunk = false;   
    }
    //for hit the hits counter increase and check if the ship is sunk
    hit() {
        if (!this.sunk) {  
            this.hits += 1;
            this.sunk = (this.hits >= this.length);
        }
    } 
    //Check if sunk according to the number of hits
    isSunk() {
        return this.sunk;
          
    }
}
module.exports = Ship;