const [ ruleList, ticket, ticketList ] = input.trim().split(/\s+(?:your|nearby) tickets?:\n/);

const rules = ruleList.split('\n').map(line => {
  const [ field, intervalList ] = line.split(': ');
  const intervals = intervalList.split(' or ').map(int => int.split('-').map(Number));
  return { field, intervals };
});
const allIntervals = rules.flatMap(({ intervals }) => intervals);

const tickets = ticketList.split('\n').map(line => line.split(',').map(Number));

const failValues = tickets.flatMap(list => list.filter(num => allIntervals.every(([ min, max ]) => num < min || num > max)));
console.log(failValues.reduce((sum, value) => sum + value));
