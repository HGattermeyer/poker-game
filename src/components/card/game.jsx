import React, { Component } from "react";
import Card from "./card";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [...this.cardsGenerator()],
      randomCards: [],
      playerCard: [],
      boardCards: [],
      computerCards: [],
    };
  }

  render() {
    return (
      <div>
        <button onClick={this.updateRandomCards}>Button</button>
        <button onClick={this.revealCard}>Button</button>
        {this.state.randomCards.map((item, index) => {
          return <Card id={item} key={index} />;
        })}
      </div>
    );
  }

  cardsGenerator = () => {
    let card = [];
    let count = 0;

    for (let i = 0; i <= 12; i++) {
      card[count] = `${i}s`;
      count++;
      card[count] = `${i}h`;
      count++;
      card[count] = `${i}d`;
      count++;
      card[count] = `${i}c`;
      count++;
    }

    return card;
  };

  randomCardsGenerator = (number) => {
    let randomCards = [];
    let newCards = this.state.cards;

    for (let i = 0; i < number; i++) {
      let randomNumber = Math.floor(Math.random() * newCards.length);
      let card = newCards[randomNumber];
      randomCards[i] = card;

      newCards = newCards.filter((_, index) => {
        return index !== randomNumber;
      });
    }

    this.setState({ cards: [...newCards], randomCards: [...randomCards] });
    console.log(this.state.randomCards);

    return randomCards;
  };

  updateRandomCards = () => {
    this.randomCardsGenerator(5);
  };

  deleteCards = (arrayOfIndex) => {
    const cards = this.state.cards;
    const newCards = [];

    for (let i = 0; i < cards.length; i++) {
      if (!arrayOfIndex.includes(i)) newCards.push(cards[i]);
    }

    this.setState({ cards: newCards });
  };
}

export default Game;
