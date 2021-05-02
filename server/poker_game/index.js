let deck = [];
let playerCards = [];
let tableCards = [];
let computerCards = [];

function distributeCards(cardsNumber, visibility) {
  const elementCard = [];

  for (let i = 0; i < cardsNumber; i++) {
    let randomNumber = Math.floor(Math.random() * deck.length);
    let element = {};
    element.card = deck[randomNumber];
    element.visible = visibility;

    elementCard[i] = element;

    deck = deck.filter((_, index) => {
      return index !== randomNumber;
    });
  }

  return elementCard;
}

function newGame() {
  playerCards = distributeCards(2, true);
  tableCards = distributeCards(5, false);
  computerCards = distributeCards(2, false);
}

deckGenerator = () => {
  let count = 0;
  let face = "";

  for (let i = 2; i <= 14; i++) {
    switch (i) {
      case 10:
        face = "T";
        break;
      case 11:
        face = "J";
        break;
      case 12:
        face = "Q";
        break;
      case 13:
        face = "K";
        break;
      case 14:
        face = "A";
        break;
      default:
        face = String(i);
    }
    deck[count] = `${face}s`;
    count++;
    deck[count] = `${face}h`;
    count++;
    deck[count] = `${face}d`;
    count++;
    deck[count] = `${face}c`;
    count++;
  }
};

module.exports = {
  startGame: function startGame() {
    deckGenerator();
    newGame();

    // console.log("deck", deck);
    console.log("playerCards", playerCards);
    console.log("tableCards", tableCards);
    console.log("computerCards", computerCards);

    return [playerCards, tableCards, computerCards];
  },
};
