const instructions = input.trim().split('\n').map(line => line.split(' = '));

function getAddresses(address, mask) {
  const maskedBits = address.toString(2).padStart(36, 0).split('')
    .map((bit, index) => mask[index] === '0' ? bit : mask[index]);
  const parts = maskedBits.join('').split('X');
  const floatingBitCount = parts.length - 1;
  // If we have n floating bits, we'll target 2**n addresses, i.e. 1 << n
  // Please note that JavaScript works well with binary operations up to 2**30... so
  // this *might* fail but hopefully no mask will have more than 30 floating bits.
  return Array.from({ length: 1 << floatingBitCount }, (_, num) => parseInt(
    // Replacing the X's with corresponding bits
    parts.reduce((str, part, index) => str + ((num >> index - 1) & 1) + part),
    2
  ));
}

let mask;
const memory = new Map();
for (const instruction of instructions) {
  if (instruction[0] === 'mask') {
    mask = instruction[1];
  } else {
    getAddresses(instruction[0].slice(4, -1), mask).forEach(address => memory.set(address, instruction[1]));
  }
}

console.log(Array.from(memory.values()).reduce((total, value) => total + value));
