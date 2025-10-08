const Gameboard = require('../src/gameboard.js');
const Ship = require('../src/ship.js');

 
describe('Gameboard', () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(3); 
  });

  // Basic
  test('should initialize with empty ships array', () => {
    expect(gameboard.ships).toEqual([]);
  });

  test('should initialize with empty missedAttacks', () => {
    expect(gameboard.missedAttacks).toEqual([]);
  });

  test('should have board size 10', () => {
    expect(gameboard.boardSize).toBe(10);
  });


  // InBoard
  describe('InBoard()', () => {
    test('should allow valid placement', () => {
      expect(gameboard.InBoard(2, 3, 3, false)).toBe(true);
    });
    test('should allow valid vertical placement', () => {
      expect(gameboard.InBoard(2, 3, 3, true)).toBe(true);
    });

    test('should reject out-of-bounds placement (horizontal)', () => {
      expect(gameboard.InBoard(8, 3, 3, false)).toBe(false);
    });

    test('should reject out-of-bounds placement (vertical)', () => {
      expect(gameboard.InBoard(2, 8, 3, true)).toBe(false);
    });

    test('should detect ship collisions', () => {
      gameboard.placeShip(new Ship(3), 2, 3, false);//place other ship
      expect(gameboard.InBoard(3, 3, 2, true)).toBe(false);
    });
  });

  //place ship
  describe('placeship', () => {
    test('should place horizontal ship correctly', () => {
      gameboard.placeShip(new Ship(3), 2, 5, false);
      expect(gameboard.ships.length).toBe(1);
      expect(gameboard.ships[0].coordinates).toEqual([
        {x: 2, y: 5},
        {x: 3, y: 5},
        {x: 4, y: 5}
      ]);
    });

    test('should place vertical ship correctly', () => {
      gameboard.placeShip(new Ship(2), 2, 6, true);
      expect(gameboard.ships.length).toBe(1);
      expect(gameboard.ships[0].coordinates).toEqual([
        {x: 2, y: 6},
        {x: 2, y: 7}
      ]);
    });
    test('ship out of bounds', () =>{
        expect(gameboard.placeShip(ship, 8, 3, false)).toBe(false);
        expect(gameboard.ships.length).toBe(0);
    });

    test('2 ships', () => {
        gameboard.placeShip(new Ship(2),1,2,false);
        gameboard.placeShip(new Ship(2),4,2,false);
        expect(gameboard.ships.length).toBe(2);
    });


  });

//Attack
describe('ReceivaAttack()', () => {
    let ship;
    beforeEach(() => {
        ship = new Ship(3);
        gameboard.placeShip(ship,2,3,false);
    });

    test('should reggister a hit on ship', () => {
        const result = gameboard.receiveAttack(3, 3);
        expect(result).toBe(true);
        expect(ship.hits).toBe(1);
        expect(gameboard.ships[0].hits[1]).toBe(true);
    });

    test('Register miss', () => {
        const result = gameboard.receiveAttack(0, 0);
        expect(result).toBe(false);
        expect(gameboard.missedAttacks).toContainEqual({x: 0, y: 0});
    });

    test('should not allow duplicate hits', () => {
        gameboard.receiveAttack(3, 3);
        const result = gameboard.receiveAttack(3, 3);
        expect(result).toBe(false);
    });

    test('should not allow duplicate misses', () => {
        gameboard.receiveAttack(0, 0);
        const result = gameboard.receiveAttack(0, 0);
        expect(result).toBe(false);
    });

//Sunk a ship
describe('Sink a ship', () => {
    let gameboard;
    let ship;
    beforeEach(() => {
        gameboard = new Gameboard();
        ship = new Ship(3);
        gameboard.placeShip(ship, 2, 3, false);
    });

    test('Should sink a ship', () => {
    expect(gameboard.allShipsSunk()).toBe(false);
    gameboard.receiveAttack(2, 3);
    expect(ship.sunk).toBe(false);
    gameboard.receiveAttack(3, 3);
    expect(ship.sunk).toBe(false);
    gameboard.receiveAttack(4, 3);
    //the ships are sunk
    expect(ship.sunk).toBe(true);
    expect(gameboard.allShipsSunk()).toBe(true);
    });

});

});




});