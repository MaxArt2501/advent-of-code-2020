// Since part 2 depends on the result from part 1, we're going to put everything in a single script
const numbers = input.trim().split('\n').map(Number);
const PREVIOUS_LIST_LENGTH = 25;
let target;

for (let index = PREVIOUS_LIST_LENGTH; index < numbers.length; index++) {
  const number = numbers[index];
  const previousList = numbers.slice(index - PREVIOUS_LIST_LENGTH, index);

  if (!previousList.some(num => num !== number - num && previousList.includes(number - num))) {
    // We *should* get here at some point
    target = number;
    break;
  }
}

console.log(target);

// We shouldn't need to reach the end of the array, but whatever - we should break out of the loop way before that
for (let index = 0; index < numbers.length; index++) {
  let sum = numbers[index];
  let min = sum, max = sum;

  // This a quite confusing way to use classic for's - pay attention and use with caution!
  for (let subIndex = 1; sum < target; subIndex++) {
    const number = numbers[index + subIndex];
    min = Math.min(min, number);
    max = Math.max(max, number);
    sum += number;
  }

  if (sum === target) {
    // We *should* get here at some point
    console.log(min + max);
    break;
  }
}
