const instructions = input.trim().split('\n');

// 0 = east, 90 = south, 180 = west, 270 = north
let direction = 0;
// [longitude, latitude]
const coords = [ 0, 0 ];

for (const instruction of instructions) {
  let operation = instruction[0];
  if (operation === 'F') {
    // Translating the operation to something already handled.
    // Worth it? Meh. But it's what came to my mind. Deal with it. 😎
    operation = {
      0: 'E',
      90: 'S',
      180: 'W',
      270: 'N'
    }[direction];
  }
  const value = +instruction.slice(1);
  switch (operation) {
    case 'W':
      coords[0] -= value;
      break;
    case 'E':
      coords[0] += value;
      break;
    case 'N':
      coords[1] -= value;
      break;
    case 'S':
      coords[1] += value;
      break;
    case 'R':
      direction = (direction + value) % 360;
      break;
    case 'L':
      // Turning left is like turning right by the explementary angle
      // This way the direction will always be in the range 0-270
      direction = (direction + 360 - value) % 360;
      break;
  }
}

console.log(Math.abs(coords[0]) + Math.abs(coords[1]));
