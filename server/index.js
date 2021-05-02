const express = require("express");
var Hand = require("pokersolver").Hand;
var game = require("./poker_game/");
const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  let winnerMessage = "winner";
  let playerCards = [];
  let tableCards = [];
  let computerCards = [];

  [playerCards, tableCards, computerCards] = game.startGame();

  const player = Hand.solve([
    ...playerCards.map((cards) => cards.card),
    ...tableCards.map((cards) => cards.card),
  ]);
  const computer = Hand.solve([
    ...computerCards.map((cards) => cards.card),
    ...tableCards.map((cards) => cards.card),
  ]);
  const winner = Hand.winners([player, computer]);

  console.log("playerCards", player.descr);

  console.log("computerCards", computer.descr);

  if (player.rank > computer.rank) {
    winnerMessage = `You win with ${player.descr}`;
    console.log(winnerMessage);
  } else if (player.rank < computer.rank) {
    winnerMessage = `Computer win with ${computer.descr}`;
    console.log(winnerMessage);
  } else {
    winnerMessage = `Draw!`;
    console.log(winnerMessage);
  }

  res.json({
    message: winnerMessage,
    playerCards: playerCards,
    tableCards: tableCards,
    computerCards: computerCards,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
