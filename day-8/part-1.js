const instructions = input.trim().split('\n').map(line => ({ opcode: line.slice(0, 3), value: +line.slice(4) }))
let accumulator = 0;
let ip = 0;
const executed = new Set();
while (!executed.has(instructions[ip])) {
  executed.add(instructions[ip]);
  if (instructions[ip].opcode === 'acc') {
    accumulator += instructions[ip].value;
  } else if (instructions[ip].opcode === 'jmp') {
    // We add -1 because we add it again later. For simplicity.
    ip += instructions[ip].value - 1;
  }
  ip++;
}
console.log(accumulator);
