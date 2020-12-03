const numbers = input.trim().split('\n').map(Number);
for (const first of numbers) {
  const second = numbers.find(num => numbers.includes(2020 - num - first));
  if (second) {
    console.log(first * second * (2020 - first - second));
    break;
  }
}
