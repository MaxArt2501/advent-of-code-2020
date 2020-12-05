// Seat specifications are just binary numbers, only using F/B for the first 7 digits and L/R for the last 3.
const seats = input.trim().split('\n').map(line => parseInt(line.replace(/[BR]/g, '1').replace(/[FL]/g, '0'), 2));

// Let's find the hole in the list, excluding the first and last non-existent seats.
const firstSeatId = Math.min(...seats);
const lastSeatId = Math.max(...seats);
for (let seatId = firstSeatId + 1; seatId < lastSeatId; seatId++) {
  if (!seats.includes(seatId)) {
    console.log(seatId);
    break;
  }
}
