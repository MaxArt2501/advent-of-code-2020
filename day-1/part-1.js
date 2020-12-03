const numbers = input.trim().split('\n').map(Number);
const number = numbers.find(num => numbers.includes(2020 - num));
console.log(number * (2020 - number))
