const busList = input.slice(input.indexOf('\n')).split(',');

/**
 * How does this work? Iteratively, each bus must depart a multiple of the product
 * of the previous bus. It should be a multiple of the least common multiple, but all
 * the id's should be primes (or co-prime).
 * Mathematically speaking, we're trying to solve a bunch of linear Diophantine equations.
 */
const result = busList.reduce(({ time, prod }, id, diff) => {
  if (!isNaN(id)) {
    while (((time += prod) + diff) % id !== 0);
    prod *= id;
  }
  return { time, prod };
}, { time: 0, prod: 1 });

console.log(result.time);
