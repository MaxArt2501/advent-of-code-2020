// This solution is basically the same of part 1, but largerly optimized due to the large
// numbers involved. And yet it took *half an hour* on my Ryzen 5 3600...
// Some better optimizations could have been done - primarily, checking what's the smaller
// slice to move within the circle instead of a fixed one - but I just didn't want to get
// crazy about all the indexes...
const input = '156794823';
const SIZE = 1e6;

const circle = new Uint32Array(SIZE);
input.split('').forEach((num, index) => circle[index] = +num);
for (let index = input.length; index < SIZE; index++) {
  circle[index] = index + 1;
}

let pos = 0;
for (let count = 0; count < 1e7; count++) {
  const current = circle[pos];
  const chunk = pos < SIZE - 3 ? circle.slice(pos + 1, pos + 4) : Uint32Array.from([ ...circle.slice(pos + 1), ...circle.slice(0, pos + 4 - SIZE) ]);

  let dest = current;
  do {
    dest = dest > 1 ? dest - 1 : SIZE;
  } while (chunk.includes(dest));
  const destPos = circle.indexOf(dest);

  let target;
  if (pos < SIZE - 3) {
    if (destPos < pos) {
      circle.copyWithin(destPos + 4, destPos + 1, pos + 1);
      target = destPos + 1;
      pos += 4;
    } else {
      circle.copyWithin(pos + 1, pos + 4, destPos + 1);
      target = destPos - 2;
      pos++;
    }
  } else {
    const overflow = pos + 4 - SIZE;
    circle.copyWithin(pos + 1, overflow, 3);
    circle.copyWithin(0, 3, destPos + 1)
    target = destPos - 2;
    pos++;
  }
  pos %= SIZE;
  if (target > SIZE - 3) {
    target -= SIZE;
  }
  if (target < 0) {
    circle.set(chunk.slice(0, -target), SIZE + target);
    circle.set(chunk.slice(-target), 0);
  } else {
    circle.set(chunk, target);
  }
}

const indexOf1 = circle.indexOf(1);
const nextCup = circle[(indexOf1 + 1) % SIZE];
const nextNextCup = circle[(indexOf1 + 2) % SIZE];
console.log(nextCup * nextNextCup);
