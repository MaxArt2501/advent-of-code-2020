const rows = input.trim().split('\n');

function countTrees(slope) {
  return rows.reduce(({ count, column }, row) => ({
    count: count + (row([(column + slope) % row.length]) === '#' ? 1 : 0),
    column: (column + slope) % row.length
  }), { count: 0, column: -slope }).count;
}

console.log([ 1, 3, 5, 7, .5 ].map(countTrees).reduce((prod, factor) => prod * factor, 1));
