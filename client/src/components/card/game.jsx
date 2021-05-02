import React, { Component } from "react";
import Card from "./card";

import "./game.scss";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distributed: false,
      cards: [...this.cardsGenerator()],
      randomCards: [],
      playerCards: [],
      boardCards: [],
      computerCards: [],
    };
  }

  render() {
    return (
      <div>
        <button onClick={this.newGame}>New Game</button>
        {this.state.distributed ? (
          <></>
        ) : (
          <button onClick={this.startGame}>Distribute</button>
        )}

        <ul>
          {" Deck "}

          {this.state.randomCards.map((item, index) => {
            return (
              <li>
                <Card id={item} key={index} />
              </li>
            );
          })}
        </ul>
        <ul>
          Player Cards
          {this.state.playerCards.map((item, index) => {
            return (
              <li>
                <Card id={item.card} key={index} />
              </li>
            );
          })}
        </ul>
        <ul>
          Board Cards
          {this.state.boardCards.map((item, index) => {
            return (
              <li>
                <Card id={item.card} key={index} />
              </li>
            );
          })}
        </ul>
        <ul>
          Computer Cards
          {this.state.computerCards.map((item, index) => {
            return (
              <li>
                <Card id={item.card} key={index} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  cardsGenerator = () => {
    let card = [];
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
      card[count] = `${face}s`;
      count++;
      card[count] = `${face}h`;
      count++;
      card[count] = `${face}d`;
      count++;
      card[count] = `${face}c`;
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

    return randomCards;
  };

  startGame = () => {
    let newRandomCards = this.state.randomCards;
    let newPlayerCards;
    let newBoardCards;
    let computerCards;

    [newPlayerCards, newRandomCards] = this.distributeCards(
      2,
      true,
      newRandomCards
    );
    [newBoardCards, newRandomCards] = this.distributeCards(
      5,
      false,
      newRandomCards
    );
    [computerCards, newRandomCards] = this.distributeCards(
      2,
      false,
      newRandomCards
    );

    this.setState(
      {
        randomCards: newRandomCards,
        playerCards: newPlayerCards,
        boardCards: newBoardCards,
        computerCards: computerCards,
        distributed: true,
      },
      () => {
        console.log("state", this.state);
      }
    );
  };

  distributeCards = (cardsNumber, visibility, newRandomCards) => {
    const elementCard = [];

    for (let i = 0; i < cardsNumber; i++) {
      let randomNumber = Math.floor(Math.random() * newRandomCards.length);
      let element = {};
      element.card = newRandomCards[randomNumber];
      element.visible = visibility;

      elementCard[i] = element;

      console.log(i, newRandomCards);
      newRandomCards = newRandomCards.filter((_, index) => {
        return index !== randomNumber;
      });
    }

    return [elementCard, newRandomCards];
  };

  newGame = () => {
    this.setState({
      playerCards: [],
      boardCards: [],
      computerCards: [],
      distributed: false,
    });

    this.randomCardsGenerator(9);
  };

  deleteCards = (arrayOfIndex) => {
    const cards = this.state.cards;
    const newCards = [];

    for (let i = 0; i < cards.length; i++) {
      if (!arrayOfIndex.includes(i)) newCards.push(cards[i]);
    }

    this.setState({ cards: newCards });
  };

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }
}

export default Game;
