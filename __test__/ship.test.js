const Ship = require('../src/ship.js');

test('Ship hit() increases hits', () => {
  const ship = new Ship(3); // ship with a 3 for length
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('Ship sunk', () => {
  const ship = new Ship(2); // ship with a 2 for length
  ship.hit();
  ship.hit();
  expect(ship.sunk).toBe(true);
});
 