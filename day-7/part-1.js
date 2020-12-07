// Mapping bag colors to the list of colors the bag should contain
const rules = input.trim().split('\n').reduce((map, rule) => {
  const [ , container, list ] = rule.match(/^(\w+ \w+) bags contain ([^\.]+).$/);
  const contained = list.split(', ');
  // Very crude, it doesn't handle 'no other bags' 😅
  map[container] = contained.map(desc => desc.slice(desc.indexOf(' ') + 1, desc.lastIndexOf(' ')));
  return map;
}, {});

const ruleEntries = Object.entries(rules);

function getContainers(color) {
  const directContainers = ruleEntries.filter(([ , list ]) => list.includes(color)).map(([ container ]) => container);
  const parentContainers = new Set(directContainers.flatMap(getContainers));
  return [ ...directContainers, ...parentContainers ];
}

console.log(getContainers('shiny gold').length);
