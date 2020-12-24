// WARNING: this solution is *incomplete*!
// Works fine for the first part, but still have to write the solution for the second part.
// Hope I'll find the time...
const rawTiles = input.trim().split('\n\n').map(block => {
  const [ id, tile ] = block.split(':\n');
  return { id, tile };
});

function reverse(string) {
  return string.split('').reverse().join('');
}

const tiles = rawTiles.map(({ id, tile }) => {
  const rows = tile.split('\n');
  const top = rows[0];
  // Tiles are 10 x 10 cells
  const right = rows.map(row => row[9]).join('');
  const bottom = reverse(rows[9]);
  const left = rows.map(row => row[0]).reverse().join('');
  // This is needed for the second part
  const map = rows.slice(1, -1).map(row => row.slice(1, -1));
  return { id, borders: [ top, right, bottom, left ], map };
});

// Check if a border is in common with another tile
const isBorderShared = tileId => border => tiles.some(({ id, borders }) =>
  id !== tileId && (
    // Either the tile's borders contain the given border or - if the tile has been
    // flipped - its reverse.
    borders.includes(border)
    || borders.includes(reverse(border))
  )
);

// Note: corner tiles have only *two* borders in common with other tiles.
const cornerTiles = tiles.filter(({ id, borders }) => {
  const sharedBorders = borders.filter(isBorderShared(id));
  return sharedBorders.length === 2;
});

// We *should* have found 4 corner tiles. My assumption is that *every* border or its
// reverse is shared with at most *one* other tile.
console.log(cornerTiles.reduce((prod, { id }) => prod * id.slice(5), 1));

function rotateTile({ id, borders, map}, amount = 1) {
  return {
    id,
    borders: [ ...borders.slice(4 - amount), ...borders.slice(0, 4 - amount) ],
    map: ([
      m => m,
      m => Array.from({ length: 8 }, (_, index) => m.map(row => row[index]).reverse().join('')),
      m => m.map(reverse).reverse(),
      m => Array.from({ length: 8 }, (_, index) => m.map(row => row[7 - index]).join(''))
    ])[amount](map)
  };
}
function flipTile({ id, borders, map}) {
  return {
    id,
    borders: [ reverse(borders[0]), reverse(borders[3]), reverse(borders[2]), reverse(borders[1]) ],
    map: map.reverse()
  };
}

// Let's take cornerTiles[0] as the top-left corner. We must be sure that its right
// and its bottom borders are the ones shared with other tiles. We'll eventually need
// to rotate the tile - it doesn't matter if the tile is flipped for now, we'd get a
// coherent map anyway, although flipped.
// Using a crude pattern matching technique...
const rotateAmount = {
  'true,true,false,false': 1,
  'false,true,true,false': 0,
  'false,false,true,true': 3,
  'true,false,false,true': 2
}[
  cornerTiles[0].borders.map(isBorderShared(cornerTiles[0].id)).join()
];
const composedMap = [ [ rotateTile(cornerTiles[0], rotateAmount) ] ];

function getNextTile(tileId, sharedBorder, orientation) {
  const nextTile = tiles.find(({ id, borders }) => id !== tileId
    && (
      borders.includes(sharedBorder)
      || borders.includes(reverse(sharedBorder))
    )
  );
  const sharedBorderIndex = nextTile.borders.findIndex(border =>
    sharedBorder === border || sharedBorder === reverse(border));
  const isFlipped = sharedBorder !== nextTile.borders[sharedBorderIndex];
  const rotations = (isFlipped ? (orientation + sharedBorderIndex) : (orientation + 4 - sharedBorderIndex)) % 4;
  return rotateTile(isFlipped ? flipTile(nextTile) : nextTile, rotations);
}

for (let index = 0; index < 8; index++) {
  while (composedMap[index].length < 8) {
    const lastTile = composedMap[index][composedMap[index].length - 1];
    composedMap[index].push(getNextTile(lastTile.id, lastTile.borders[1], 3));
  }
  if (index < 8) {
    const firstTile = composedMap[index][0];
    const nextRowTile = getNextTile(firstTile.id, firstTile.borders[2], 0);
    composedMap.push([ getNextTile(firstTile.id, firstTile.borders[2], 0) ]);
  }
}
