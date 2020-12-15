const input = [ 1, 12, 0, 20, 8, 16 ];
const TARGET_INDEX = 30_000_000;
// Yes, we're going to need *this* much memory, and we'd better reserve it now
const posList = new Uint32Array(TARGET_INDEX);
input.forEach((num, index) => posList[num] = index + 1);

let lastNum = input[input.length - 1];
for (let lastPos = input.length; lastPos < TARGET_INDEX; lastPos++) {
  const num = posList[lastNum] ? lastPos - posList[lastNum] : 0;
  posList[lastNum] = lastPos;
  lastNum = num;
}
console.log(lastNum);
