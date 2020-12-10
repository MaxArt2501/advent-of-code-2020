const jolts = input.trim().split('\n').map(Number);
// This order is *reversed* since part 1. Also, it contains 0
const sorted = [...jolts, 0].sort((a, b) => b - a);

// For every nominal amount of jolts, we're going to store the number of possible
// combinations of the next adapters
const combinationsFrom = {};
sorted.forEach((amount, index) => {
  const previousAmounts = sorted.slice(0, index).filter(prev => prev - amount < 4);
  combinationsFrom[amount] = previousAmounts.reduce((sum, prev) => sum + combinationsFrom[prev], 0) || 1;
});
console.log(combinationsFrom[0])
