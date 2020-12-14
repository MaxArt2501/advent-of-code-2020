const instructions = input.trim().split('\n').map(line => line.split(' = '));

function applyMask(value, mask) {
  const maskedBits = value.toString(2).padStart(36, 0).split('')
    .map((bit, index) => mask[index] === 'X' ? bit : mask[index]);
  return parseInt(maskedBits.join(''), 2);
}

let mask;
const memory = new Map();
for (const instruction of instructions) {
  if (instruction[0] === 'mask') {
    mask = instruction[1];
  } else {
    memory.set(instruction[0].slice(4, -1), applyMask(+instruction[1], mask));
  }
}

console.log(Array.from(memory.values()).reduce((total, value) => total + value));
