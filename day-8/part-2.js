const instructions = input.trim().split('\n').map(line => ({ opcode: line.slice(0, 3), value: +line.slice(4) }))

function getResult(instructionSet) {
  let accumulator = 0;
  let ip = 0;
  const executed = new Set();
  // If the Instruction Pointer doesn't point to an instructions, we've reached the end
  while (ip in instructionSet && !executed.has(instructionSet[ip])) {
    executed.add(instructionSet[ip]);
    if (instructionSet[ip].opcode === 'acc') {
      accumulator += instructionSet[ip].value;
    } else if (instructionSet[ip].opcode === 'jmp') {
      // We add -1 because we add it again later. For simplicity.
      ip += instructionSet[ip].value - 1;
    }
    ip++;
  }
  // Return NaN if the set has an infinite loop, otherwise return the accumulator
  return instructionSet[ip] ? NaN : accumulator;
}

// Yes, I'm using a classic for loop in 2020. Sue me.
for (let index = 0; index < instructions.length; index++) {
  const { opcode, value } = instructions[index];
  if (opcode === 'acc') {
    continue;
  }
  const result = getResult([
    ...instructions.slice(0, index),
    { opcode: opcode === 'nop' ? 'jmp' : 'nop', value },
    ...instructions.slice(index + 1)
  ]);
  if (!isNaN(result)) {
    console.log(result);
    break;
  }
}
