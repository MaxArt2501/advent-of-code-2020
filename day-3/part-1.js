const rows = input.trim().split('\n');

function countTrees(slope) {
  return rows.reduce(({ count, column }, row) => ({
    count: count + (row([(column + slope) % row.length]) === '#' ? 1 : 0),
    column: (column + slope) % row.length
  }), { count: 0, column: -slope }).count;
}

console.log(countTrees(3));
