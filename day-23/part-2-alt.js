// Reimplemented with linked lists. Smaller, simpler, and 3 orders of magnitude *faster*:
// this completes in 1.1 *seconds*...
// Follow this rule: if the "classic" solution involves moving hundreds of thousand of
// items, then try a linked list: less intuitive but doesn't have to move stuff around.
// *And* it solves circularity in an incredibly simple way...
const input = '156794823';
const SIZE = 1e6;

const items = Array.from({ length: SIZE }, (_, index) => ({
  value: index + 1,
  next: null
}));
for (let index = 0; index < 9; index++) {
  items[index].next = items[input[input.indexOf(index + 1) + 1] - 1] || items[9];
}
for (let index = 9; index < SIZE - 1; index++) {
  items[index].next = items[index + 1];
}
items[SIZE - 1].next = items[0];

let current = items[0];
for (let count = 0; count < 1e7; count++) {
  const chunk = [ current.next, current.next.next, current.next.next.next ];
  const chunkValues = chunk.map(item => item.value);

  let destValue = current.value;
  do {
    destValue = destValue > 1 ? destValue - 1 : SIZE;
  } while (chunkValues.includes(destValue));
  const dest = items[destValue - 1];

  current.next = chunk[2].next;
  chunk[2].next = dest.next;
  dest.next = chunk[0];

  current = current.next;
}

const nextCup = items[0].next;
const nextNextCup = nextCup.next;
console.log(nextCup.value * nextNextCup.value);
