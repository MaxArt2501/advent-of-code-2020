const input = [ 1, 12, 0, 20, 8, 16 ];

// This isn't efficient but does the trick. It'll cause a huge memory occupation
// for part 2, though...
while (input.length < 2020) {
  const lastIndex = input.length - 1;
  const lastNum = input[lastIndex];
  const index = input.lastIndexOf(lastNum, lastIndex - 1);
  input.push(index === -1 ? 0 : lastIndex - index);
}

console.log(input[2019]);
