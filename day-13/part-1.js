const estimate = +input.slice(0, input.indexOf('\n'));
const buses = input.slice(input.indexOf('\n')).split(',').map(Number).filter(Boolean);
const departures = buses.map(id => Math.ceil(estimate / id) * id);
const earliestDeparture = Math.min(...departures);
const earliestBus = buses[departures.indexOf(earliestDeparture)];
console.log((earliestDeparture - estimate) * earliestBus);
