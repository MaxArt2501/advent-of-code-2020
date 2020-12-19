const [ ruleList, lineList ] = input.trim().split('\n\n');
const rules = ruleList.split('\n').reduce((map, line) => {
  const [ index, rule ] = line.split(': ');
  map[index] = rule;
  return map;
}, {});

function buildRegExp(index) {
  let reSource = rules[index];
  while (/\d/.test(reSource)) {
    reSource = reSource.replace(/\d+/g, ref => rules[ref][0] === '"' ? rules[ref][1] : `(?:${rules[ref]})`);
  }
  return reSource.replaceAll(' ', '');
}

// Rule 0 should be "8 11" for everyone.
// Rule 8 as "42 | 42 8" means "match 42 as many times as needed", while rule 11 as "42 31 | 42 11 31"
// means "match 31 as many times as the matches of 42". Put those together, they means in short: "match
// 42 more times than 31".
const source42 = buildRegExp(42);
const source31 = buildRegExp(31);
const re42 = new RegExp(source42, 'g')
const re31 = new RegExp(source31, 'g')
const re = new RegExp(`^((?:${source42})+)((?:${source31})+)$`);

const valid = lineList.split('\n').filter(line => {
  const match = re.exec(line);
  if (!match) return false;

  const match42 = match[1].match(re42);
  const match31 = match[2].match(re31);
  return match42.length > match31.length;
});
console.log(valid.length);
