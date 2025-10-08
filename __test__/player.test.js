const Gameboard = require('../src/gameboard.js');
const Ship = require('../src/ship.js');
const Player = require('../src/player.js');
////npx jest player.test.js


describe('Player', () => {
    let humanPlayer;
    let otherHumanPlayer;
    let computerPlayer;
    
    //allows the execution of a specified function before each test
    beforeEach(() => {
        humanPlayer = new Player('human');
        otherHumanPlayer = new Player('human');
        computerPlayer = new Player('computer');
        
    });
    //test 1
    //The human choose to place a ship
    //describe it groups the related tests
    describe('Ship placement', () => {
        //test(it) defines an individual test with description
        test('Human place ships on their board', () => {
            //Try to place at x=0 y=0 horizontally with false=no,is expect to be true
            expect(humanPlayer.placeShip(0,0,0,false)).toBe(true);
            //verify if the board has 1 ship
            expect(humanPlayer.gameboard.ships.length).toBe(1);
            //verify the exact coordinates
            expect(humanPlayer.gameboard.ships[0].coordinates).toEqual([
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0}
            ]);

            expect(humanPlayer.placeShip(1,0,0,false)).toBe(false);
            expect(humanPlayer.gameboard.ships.length).toBe(1);

            expect(humanPlayer.placeShip(1,4,4,true)).toBe(true);
            expect(humanPlayer.placeShip(2,2,6,false)).toBe(true);
            expect(humanPlayer.gameboard.ships.length).toBe(3);
        });

        test('Computer place ships on their board', () => {
            computerPlayer.placeShipsRandomly();

            expect(computerPlayer.gameboard.ships.length).toBe(3);

            const allCoords = computerPlayer.gameboard.ships.flatMap(s => s.coordinates);
            const uniqueCoords = new Set(allCoords.map(JSON.stringify));
            expect(uniqueCoords.size).toBe(allCoords.length);

            computerPlayer.gameboard.ships.forEach(shipData => {
                shipData.coordinates.forEach(coord => {
                    expect(coord.x).toBeGreaterThanOrEqual(0);
                    expect(coord.x).toBeLessThan(10);
                    expect(coord.y).toBeGreaterThanOrEqual(0);
                    expect(coord.y).toBeLessThan(10);
                });
            });
        });

        

    });
    //player lose 
    describe('Player loses', () => {
        test('ships sunk and player lose', () => {
            expect(humanPlayer.placeShip(0,0,0,false)).toBe(true);
            expect(humanPlayer.gameboard.allShipsSunk()).toBe(false);
            //attack works
            otherHumanPlayer.attack(humanPlayer.gameboard, 0, 0);
            otherHumanPlayer.attack(humanPlayer.gameboard, 1, 0);
            otherHumanPlayer.attack(humanPlayer.gameboard, 2, 0);

        expect(humanPlayer.ships[0].isSunk()).toBe(true);
        expect(humanPlayer.gameboard.allShipsSunk()).toBe(true);

        });
    });
    //player can attack, recieve attack, win and lose, so human player works



   describe('Computer Attacks', () => {
        test('should attack random valid positions', () => {
            for (let i = 0; i < 50; i++) {
                const attackResult = computerPlayer.computerAttack(humanPlayer.gameboard);
                
                expect(attackResult).toHaveProperty('coordinates');
                expect(attackResult).toHaveProperty('result');
                
                expect(attackResult.coordinates.x).toBeGreaterThanOrEqual(0);
                expect(attackResult.coordinates.x).toBeLessThan(10);
                expect(attackResult.coordinates.y).toBeGreaterThanOrEqual(0);
                expect(attackResult.coordinates.y).toBeLessThan(10);
                
                expect(computerPlayer.previousAttacks.length).toBe(i + 1);
            }

        });

        test('Computer does not attack the same place twice', () => {
            const enemyBoard = new Gameboard(); 
            // Simular que ataca 20 veces
            for (let i = 0; i < 20; i++) {
                const result = computerPlayer.computerAttack(enemyBoard);
                const { x, y } = result.coordinates;

                // Verifica que esa posición solo esté una vez en previousAttacks
                const occurrences = computerPlayer.previousAttacks.filter(
                    attack => attack.x === x && attack.y === y
                );

                expect(occurrences.length).toBe(1); // Solo debe haber 1 ataque en esas coordenadas
            }

            // Verifica que tenga 20 ataques diferentes
            expect(computerPlayer.previousAttacks.length).toBe(20);
        });
    });
    

});


