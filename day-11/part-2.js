let rows = input.trim().split('\n');

/**
 * Return true if there's an occupied seat on the given direction
 * @param {string[]} rows
 * @param {number} rowIndex
 * @param {number} colIndex
 * @param {number} dr Delta row. Don't set to 0 together with dc
 * @param {number} dc Delta column. Don't set to 0 together with dr
 * @returns {boolean}
 */
function checkDirection(rows, rowIndex, colIndex, dr, dc) {
  while ((rowIndex + dr) >= 0 && (rowIndex + dr < rows.length) && (colIndex + dc >= 0) && (colIndex + dc) < rows[0].length) {
    rowIndex += dr;
    colIndex += dc;
    if (rows[rowIndex][colIndex] === '#') return true;
    if (rows[rowIndex][colIndex] === 'L') return false;
  }
  return false;
}

/**
 * Count the number of occupied seats visible from a given position
 * @param {string[]} rows
 * @param {number} rowIndex
 * @param {number} colIndex
 * @returns {number}
 */
function countOccupied(rows, rowIndex, colIndex) {
  let count = 0;
  for (let dr = -1; dr < 2; dr++)
    for (let dc = -1; dc < 2; dc++)
      count += (dr !== 0 || dc !== 0) && checkDirection(rows, rowIndex, colIndex, dr, dc) ? 1 : 0;
  return count;
}

/**
 * Given a grid configuration, evolve it into a new configuration. The basic of a cellular automaton.
 * @param {string[]} rows
 */
function iterate(rows) {
  return rows.map((row, rowIndex) => {
    return row.split('').map((col, colIndex) => {
      if (col === '.') return col;
      const occupied = countOccupied(rows, rowIndex, colIndex);
      return col === 'L' && occupied === 0 ? '#' : col === '#' && occupied > 5 ? 'L' : col;
    }).join('');
  });
}

let prev = rows;
// Not really efficient...
while (prev.join('') !== (rows = iterate(rows)).join('')) prev = rows;

console.log(rows.join('').split('#').length - 1);
