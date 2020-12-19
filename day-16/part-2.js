const [ ruleList, ticket, ticketList ] = input.trim().split(/\s+(?:your|nearby) tickets?:\n/);
const splitLine = (separator = ',') => line => line.split(separator).map(Number);
const areAllInIntervals = intervals => list => list.every(num => intervals.some(([ min, max ]) => num >= min && num <= max));

const rules = ruleList.split('\n').map(line => {
  const [ field, intervalList ] = line.split(': ');
  const intervals = intervalList.split(' or ').map(splitLine('-'));
  return { field, intervals };
});
const allIntervals = rules.flatMap(({ intervals }) => intervals);

const tickets = ticketList.split('\n').map(splitLine());
const validTickets = tickets.filter(areAllInIntervals(allIntervals));

const values = ticket.split(',').map(Number);
// All the possibile fields for each value in every ticket
let possibleFields = values.map((_, index) => {
  const column = validTickets.map(list => list[index]);
  return rules.filter(({ intervals }) => areAllInIntervals(intervals)(column)).map(({ field }) => field);
});

// So far, so good. Now, the possibile fields for the values of the ticket might be more than one,
// but our input *should* have at least a value that has a forced choice.
// Remove that field from the possibile fields of the other values, and at least one more values
// should now have a forced choice (i.e., it had two before). And so on, until all the fields are
// assigned.
while (possibleFields.some(list => list.length > 1)) {
  const assignedFields = possibleFields.filter(list => list.length === 1).flat();
  possibleFields = possibleFields.map(list => list.length > 1
    ? list.filter(field => !assignedFields.includes(field))
    : list
  );
}

const product = values.reduce((prod, value, index) => prod * (possibleFields[index][0].startsWith('departure') ? value : 1), 1);
console.log(product);
