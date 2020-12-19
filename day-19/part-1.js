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

const re = new RegExp(`^(?:${buildRegExp(0)})$`);
console.log(lineList.split('\n').filter(line => re.test(line)).length);
