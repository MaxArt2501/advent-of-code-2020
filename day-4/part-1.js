const passports = input.trim().split('\n\n').map(
  block => block.split(/\s/).reduce((passport, keyValue) => Object.assign(passport, {
    [keyValue.slice(0, 3)]: keyValue.slice(4)
  }), {})
);

console.log(passports.filter(passport => {
  const keyCount = Object.keys(passport).length;
  return keyCount === 8 || keyCount === 7 && !('cid' in passport)
}).length);
