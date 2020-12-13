const busList = input.slice(input.indexOf('\n')).split(',');
const buses = busList.map(Number).filter(Boolean);

// This maps each bus id to its difference in minutes since the first bus in order has departed
const timetable = busList.reduce((table, id, index) => {
  if (!isNaN(id)) {
    table[+id] = index;
  }
  return table;
}, {});

/**
 * How does this works? Iteratively, each bus must depart a multiple of the product
 * of the previous bus.
 * Mathematically speaking, we're trying to solve a bunch of linear Diophantine equations.
 */
let prod = 1;
let time = 0;
for (const id of buses) {
  let factor = 0;
  while ((time + factor * prod + timetable[id]) % id !== 0) factor++;
  time += factor * prod;
  prod *= id;
}

console.log(time);
