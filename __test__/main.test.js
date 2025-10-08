const gameStart = require('../src/main.js');
//npm test -- main.test.js
describe('start', () => {

    test('Game initializes players correctly', () => {
        const { humanPlayer, computerPlayer } = gameStart();

        expect(humanPlayer.type).toBe('human');
        expect(computerPlayer.type).toBe('computer');
        expect(humanPlayer.gameboard.ships.length).toBe(0);
        expect(computerPlayer.gameboard.ships.length).toBe(3);

    });

});
 


describe("Player attacks", () => {
    let humanPlayer;
    let computerPlayer;

    beforeEach(() => {
        // Inicia un nuevo juego antes de cada test
        const game = gameStart();
        humanPlayer = game.humanPlayer;
        computerPlayer = game.computerPlayer;
    });


    test("Human player can attack computer's board", () => {
        // Forzamos un barco en (0,0)
        computerPlayer.gameboard.placeShip(computerPlayer.ships[0], 0, 0, false);

        const result = humanPlayer.attack(computerPlayer.gameboard, 0, 0);
        expect(result).toBe(true);  // el ataque debería ser un acierto
        expect(computerPlayer.gameboard.ships[0].ship.hits).toBe(1);
    });

    test("Computer player can attack human's board", () => {
        const attack = computerPlayer.attack(humanPlayer.gameboard);

        expect(attack.coordinates.x).toBeGreaterThanOrEqual(0);
        expect(attack.coordinates.x).toBeLessThan(10);
        expect(attack.coordinates.y).toBeGreaterThanOrEqual(0);
        expect(attack.coordinates.y).toBeLessThan(10);
        expect(typeof attack.result).toBe("boolean");
    });

});

