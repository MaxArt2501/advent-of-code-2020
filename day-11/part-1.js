let rows = input.trim().split('\n');

function iterate(rows) {
  return rows.map((row, rowIndex) => {
    return row.split('').map((col, colIndex) => {
      if (col === '.') return col;
      const around = rows.slice((rowIndex || 1) - 1, rowIndex + 2).map(r => r.slice((colIndex || 1) - 1, colIndex + 2)).join('');
      const occupied = around.split('#').length - 1;
      return col === 'L' && occupied === 0 ? '#' : col === '#' && occupied > 4 ? 'L' : col;
    }).join('');
  });
}

let prev = rows;
// Not really efficient...
while (prev.join('') !== (rows = iterate(rows)).join('')) prev = rows;

console.log(rows.join('').split('#').length - 1);
