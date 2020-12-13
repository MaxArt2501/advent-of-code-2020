const busList = input.slice(input.indexOf('\n')).split(',');
const buses = busList.map(Number).filter(Boolean);

/**
 * How does this works? Iteratively, each bus must depart a multiple of the product
 * of the previous bus.
 * Mathematically speaking, we're trying to solve a bunch of linear Diophantine equations.
 */
const result = busList.reduce(({ time, prod }, id, diff) => {
  if (!isNaN(id)) {
    let factor = 0;
    while ((time + factor * prod + diff) % id !== 0) factor++;
    time += factor * prod;
    prod *= id;
  }
  return { time, prod };
}, { time: 0, prod: 1 });

console.log(result.time);
