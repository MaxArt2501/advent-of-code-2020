function expand(state) {
  const size = state.indexOf('\n');
  const line = '.'.repeat(size + 2);
  const empty = Array.from({ length: size + 2 }).fill(line).join('\n');
  return [
    empty,
    ...state.split('\n\n').map(plane => [ line, ...plane.split('\n').map(r => `.${r}.`), line ].join('\n')),
    empty
  ].join('\n\n');
}

function evolve(state) {
  const size = state.indexOf('\n');
  const planeSize = (size + 1) * size + 1;
  const planes = (state.length + 2) / planeSize;
  let result = '';
  for (let z = 0; z < planes; z++) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const pos = z * planeSize + y * (size + 1) + x;
        const around = state.slice(pos - planeSize - size - 2, pos - planeSize - size + 1)
          + state.slice(pos - planeSize - 1, pos - planeSize + 2)
          + state.slice(pos - planeSize + size, pos - planeSize + size + 3)
          + state.slice(pos - size - 2, pos - size + 1)
          + state.slice(pos - 1, pos + 2)
          + state.slice(pos + size, pos + size + 3)
          + state.slice(pos + planeSize - size - 2, pos + planeSize - size + 1)
          + state.slice(pos + planeSize - 1, pos + planeSize + 2)
          + state.slice(pos + planeSize + size, pos + planeSize + size + 3);
        const count = around.split('#').length - 1;
        result += state[pos] === '#' && (count === 3 || count === 4) || state[pos] === '.' && count === 3 ? '#' : '.';
      }
      result += '\n';
    }
    result += '\n';
  }
  return result;
}

let state = input.trim();
for (let index = 0; index < 6; index++) {
  state = evolve(expand(state));
}

console.log(state.split('#').length - 1);
