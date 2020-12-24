let decks = input.trim().split('\n\n').map(block => block.split('\n').slice(1).map(Number));

while (decks.every(deck => deck.length > 0)) {
  const hand = decks.map(deck => deck[0]);
  const winner = hand.indexOf(Math.max(...hand));
  if (winner) hand.reverse();
  decks = decks.map((deck, index) => [ ...deck.slice(1), ...(winner === index ? hand : []) ]);
}

console.log(decks.flat().reduce((score, card, index, array) => score + card * (array.length - index), 0));
