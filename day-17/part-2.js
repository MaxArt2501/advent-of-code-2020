const DIMENSIONS = 4;
const filler = ',0'.repeat(DIMENSIONS - 2);

let universe = new Set();
input.trim().split('\n').forEach((line, y) => line.split('').forEach((cell, x) => {
  if (cell === '#') {
    universe.add(`${x},${y}${filler}`);
  }
}));

function *getCoords(startValues, endValues) {
  let coords = startValues.slice();
  const dimensions = coords.length;
  while (coords.some((value, index) => value < endValues[index])) {
    yield coords.join();
    for (let index = 0; index < dimensions; index++) {
      if (coords[index] < endValues[index]) {
        coords[index]++;
        break;
      }
      coords[index] = startValues[index];
    }
  }
  yield coords.join();
}

function countActive(activeCells, coords) {
  const startCoords = coords.split(',').map(coord => coord - 1);
  const endCoords = coords.split(',').map(coord => +coord + 1);
  let count = 0;
  for (const coords of getCoords(startCoords, endCoords)) {
    if (activeCells.has(coords)) {
      count++;
    }
  }
  return count;
}

function evolve(activeCells) {
  const coordSet = Array.from({ length: DIMENSIONS }, () => []);
  for (const coords of activeCells) {
    coords.split(',').forEach((coord, index) => coordSet[index].push(+coord));
  };

  const startCoords = coordSet.map(list => Math.min(...list) - 1);
  const endCoords = coordSet.map(list => Math.max(...list) + 1);

  const nextState = new Set();
  for (const coords of getCoords(startCoords, endCoords)) {
    const count = countActive(activeCells, coords);
    const isActive = activeCells.has(coords);
    if (isActive && (count === 3 || count === 4) || !isActive && count === 3) {
      nextState.add(coords);
    }
  }

  return nextState;
}

for (let i = 0; i < 6; i++) {
  universe = evolve(universe);
}
console.log(universe.size);
