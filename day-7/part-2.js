// Mapping bag colors to the list of colors the bag should contain and their quantities
const rules = input.trim().split('\n').reduce((map, rule) => {
  const [ , container, list ] = rule.match(/^(\w+ \w+) bags contain ([^\.]+).$/);
  map[container] = list !== 'no other bags' ? list.split(', ').map(desc => ({
    quantity: +desc.slice(0, desc.indexOf(' ')),
    color: desc.slice(desc.indexOf(' ') + 1, desc.lastIndexOf(' '))
  })) : [];
  return map;
}, {});

function getContained(container) {
  const rule = rules[container];
  return rule.reduce((total, { quantity, color }) => total + quantity + quantity * getContained(color), 0);
}

console.log(getContained('shiny gold'));
