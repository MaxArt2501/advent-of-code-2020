const directionList = input.trim().split('\n');

const DIR_RE = /[ns][ew]|[ew]/g;
function parseDirections(directions) {
  return directions.match(DIR_RE);
}

// I'm using a checkerboard pattern, here. Only cells whose coordinates sum up
// to an even number are considered. This bit me on part 2 but overall it
// allows a better visualization.
// Here are the shifts corresponding to each movement:
const directionMap = {
  nw: [ -1, -1 ],
  ne: [ 1, -1 ],
  e: [ 2, 0 ],
  se: [ 1, 1 ],
  sw: [ -1, 1 ],
  w: [ -2, 0 ]
};
function followDirections(directions) {
  let x = 0;
  let y = 0;
  for (const direction of parseDirections(directions)) {
    const [ dx, dy ] = directionMap[direction];
    x += dx;
    y += dy;
  }
  return [ x, y ];
}

function getBlackTiles(directionList) {
  const blackTiles = new Set();
  for (const directions of directionList) {
    const tile = followDirections(directions).join();
    if (blackTiles.has(tile)) {
      blackTiles.delete(tile);
    } else {
      blackTiles.add(tile);
    }
  }
  return blackTiles;
}

let blackTiles = getBlackTiles(directionList);
console.log(blackTiles.size);

const adjacentTiles = Object.values(directionMap);
function evolve(blackTiles) {
  const { minX, minY, maxX, maxY } = Array.from(blackTiles).reduce((bounds, tile) => {
    const [ x, y ] = tile.split(',');
    return {
      minX: Math.min(bounds.minX, x),
      minY: Math.min(bounds.minY, y),
      maxX: Math.max(bounds.maxX, x),
      maxY: Math.max(bounds.maxY, y)
    };
  }, { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });

  const newBlackSet = new Set(blackTiles);

  for (let y = minY - 1; y <= maxY + 1; y++) {
    const oddBit = (minX + y) & 1;
    for (let x = minX - 2 + oddBit; x <= maxX + 2 - oddBit; x += 2) {
      const tile = [ x, y ].join();
      const blackCount = adjacentTiles.filter(([ dx, dy ]) => blackTiles.has([ x + dx, y + dy ].join())).length;
      const isBlack = blackTiles.has(tile);
      if (isBlack && (blackCount === 0 || blackCount > 2)) {
        newBlackSet.delete(tile);
      } else if (!isBlack && blackCount === 2) {
        newBlackSet.add(tile);
      }
    }
  }

  return newBlackSet;
}

for (let count = 0; count < 100; count++) {
  blackTiles = evolve(blackTiles);
}
console.log(blackTiles.size);
