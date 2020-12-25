const [ cardPublicKey, doorPublicKey ] = input.trim().split('\n').map(Number);

let cardSecretLoop;
let doorSecretLoop;
let value = 1;
let subjectNumber = 7;
const modulo = 20201227;
// We don't need to find *both* loops if we do things correctly!
for (let count = 1; !cardSecretLoop && !doorSecretLoop; count++) {
  value = (value * subjectNumber) % modulo;
  if (!cardSecretLoop && value === cardPublicKey) {
    cardSecretLoop = count;
  }
  if (!doorSecretLoop && value === doorPublicKey) {
    doorSecretLoop = count;
  }
}

value = 1;
const iterations = cardSecretLoop || doorSecretLoop;
subjectNumber = cardSecretLoop ? doorPublicKey : cardPublicKey;
for (let count = 0; count < iterations; count++) {
  value = (value * subjectNumber) % modulo;
}
console.log(value);
