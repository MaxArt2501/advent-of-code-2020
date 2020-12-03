const database = input.trim().split('\n').map(row => {
  const [ , min, max, char, password ] = row.match(/^(\d+)-(\d+) ([a-z]): ([a-z]+)$/);
  return { min, max, char, password }
});

function countChars(string, char) {
  // Warning: this is quite inefficient. If you need performance, don't use this trick.
  return string.split(char).length - 1;
}

console.log(database.filter(({ min, max, char, password }) => {
  const count = countChars(password, char);
  return count >= +min && count <= +max;
}).length);
