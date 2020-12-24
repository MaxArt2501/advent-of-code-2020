const decks = input.trim().split('\n\n').map(block => block.split('\n').slice(1).map(Number));

function playGame(decks) {
  const rounds = new Set();
  while (decks.every(deck => deck.length)) {
    if (rounds.has(decks.join(' '))) {
      // Player 1 wins, return the decks as they are
      return decks;
    }
    rounds.add(decks.join(' '));
    const winner = getWinner(decks);
    const hand = decks.map(deck => deck[0]);
    if (winner) hand.reverse();
    decks = decks.map((deck, index) => [ ...deck.slice(1), ...(winner === index ? hand : []) ]);
  }
  return decks;
}

function getWinner(decks) {
  const hand = decks.map(deck => deck[0]);
  if (hand.every((count, index) => decks[index].length > count)) {
    const result = playGame(decks.map((deck, index) => deck.slice(1, hand[index] + 1)));
    const counts = result.map(deck => deck.length);
    // If a deck is empty, the other is the winner; otherwise it's player 1 (0)
    return counts.includes(0) ? 1 - counts.indexOf(0) : 0;
  }
  return hand.indexOf(Math.max(...hand));
}

const result = playGame(decks);
const winnerDeck = result.every(deck => deck.length > 0) ? result[0] : result.find(deck => deck.length > 0);
console.log(winnerDeck.reduce((score, card, index) => score + card * (winnerDeck.length - index), 0));
