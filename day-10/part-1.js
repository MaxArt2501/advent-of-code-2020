const jolts = input.trim().split('\n').map(Number);
const sorted = jolts.slice().sort((a, b) => a - b);
const diffs = sorted.map((amount, index) => index ? amount - sorted[index - 1] : amount);
const diffsOf1 = diffs.filter(diff => diff === 1).length;
// + 1 because we have to count the last "virtual" difference of 3
console.log(diffsOf1 * (jolts - diffsOf1 + 1));
