const database = input.trim().split('\n').map(row => {
  const [ , pos1, pos2, char, password ] = row.match(/^(\d+)-(\d+) ([a-z]): ([a-z]+)$/);
  return { pos1, pos2, char, password }
});

console.log(database.filter(({ pos1, pos2, char, password }) => {
  return password[pos1 - 1] === char && password[pos2 - 1] !== char
    || password[pos1 - 1] !== char && password[pos2 - 1] === char;
}).length);
