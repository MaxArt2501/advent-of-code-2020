const instructions = input.trim().split('\n');

const coords = [ 0, 0 ];
const wpCoords = [ 10, -1 ]

for (const instruction of instructions) {
  let operation = instruction[0];
  let value = +instruction.slice(1);
  if (operation === 'L') {
    // Turning left is like turning right by the explementary angle
    operation = 'R';
    value = 360 - value;
  }
  switch (operation) {
    case 'W':
      wpCoords[0] -= value;
      break;
    case 'E':
      wpCoords[0] += value;
      break;
    case 'N':
      wpCoords[1] -= value;
      break;
    case 'S':
      wpCoords[1] += value;
      break;
    case 'R':
      switch (value) {
        case 90:
          [ wpCoords[0], wpCoords[1] ] = [ -wpCoords[1], wpCoords[0] ];
          break;
        case 180:
          [ wpCoords[0], wpCoords[1] ] = [ -wpCoords[0], -wpCoords[1] ];
          break;
        case 270:
          [ wpCoords[0], wpCoords[1] ] = [ wpCoords[1], -wpCoords[0] ];
          break;
      }
      break;
    case 'F':
      coords[0] += wpCoords[0] * value;
      coords[1] += wpCoords[1] * value;
      break;
  }
}

console.log(Math.abs(coords[0]) + Math.abs(coords[1]));
