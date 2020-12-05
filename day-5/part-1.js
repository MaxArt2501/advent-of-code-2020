// Seat specifications are just binary numbers, only using F/B for the first 7 digits and L/R for the last 3.
const seats = input.trim().split('\n').map(line => parseInt(line.replace(/[BR]/g, '1').replace(/[FL]/g, '0'), 2));
console.log(Math.max(...seats));
