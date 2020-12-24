const input = '156794823';

function doMove({ field, current }) {
  const position = field.indexOf(current);
  const chunk = field.slice(position + 1, position + 4) + field.substring(0, position + 4 - field.length);
  const rest = field.substring(position + 4 - field.length, position + 1) + field.slice(position + 4);
  const restNum = rest.split('').map(Number);
  const sub = restNum.filter(num => num < current);
  const destination = Math.max(...(sub.length ? sub : restNum));
  const destPos = rest.indexOf(destination);
  const newField = rest.slice(0, destPos + 1) + chunk + rest.slice(destPos + 1);
  return { field: newField, current: newField[newField.indexOf(current) + 1] || newField[0] };
}

let state = { field: input, current: input[0] };
for (let count = 0; count < 100; count ++) {
  state = doMove(state);
}
const indexOf1 = state.field.indexOf(1);
console.log(state.field.slice(indexOf1 + 1) + state.field.slice(0, indexOf1));
