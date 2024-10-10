import React, { useState, useEffect } from 'react';
import { Card as CardType } from '../utils/types';
import { initializeDeck, shuffleDeck, haul, performBargain, performFleaHop, performDevilHop, performWalkyTalky, performZonkOut, performHangout, performEasyGo } from '../utils/gameLogic';
import Card from './Card';
import RulesModal from './RulesModal';
import RulesReference from './RulesReference';

const Game: React.FC = () => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [market, setMarket] = useState<CardType[]>([]);
  const [bankroll, setBankroll] = useState<CardType[]>([]);
  const [easyGo, setEasyGo] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [money, setMoney] = useState(0);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [message, setMessage] = useState('');
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [round, setRound] = useState(1);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const newDeck = initializeDeck();
    const shuffledDeck = shuffleDeck(newDeck);
    setDeck(shuffledDeck);
    setMarket(shuffledDeck);
    setBankroll([]);
    setEasyGo([]);
    setSelectedCards([]);
    setMoney(0); // Set initial money to $0
    console.log("Money set to:", 0); // Debug log
    setMessage('New round started. Select a move to begin.');
  };

  const handleCardClick = (card: CardType) => {
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter(c => c !== card));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleHaul = () => {
    const result = haul(market, selectedCards);
    if (result.success) {
      setMarket(result.newMarket);
      
      // Add a fixed amount of $1 for a successful haul
      const addedMoney = 1; // Fixed amount for a haul
      console.log("Added Money:", addedMoney); // Check the added money

      // Update bankroll and money
      setBankroll([...bankroll, ...selectedCards.map(card => ({ ...card, faceUp: false }))]);
      setMoney(prevMoney => {
          console.log("Previous Money:", prevMoney); // Check previous money
          return prevMoney + addedMoney; // Update money by adding $1
      });
      
      setSelectedCards([]);
      setMessage('Haul successful!');
    } else {
      setMessage('Invalid Haul. Select adjacent cards of the same rank.');
    }
  };

  const handleBargain = () => {
    if (selectedCards.length !== 2 || money < 1) {
      setMessage('Select exactly two adjacent cards and ensure you have enough money.');
      return;
    }
    const result = performBargain(market, selectedCards[0], selectedCards[1]);
    if (result.success) {
      setMarket(result.newMarket);
      setMoney(money - 1);
      setSelectedCards([]);
      setMessage('Bargain successful!');
    } else {
      setMessage('Invalid Bargain. Select two adjacent cards.');
    }
  };

  const handleFleaHop = () => {
    if (selectedCards.length !== 2) {
      setMessage('Select exactly two cards of the same suit.');
      return;
    }
    const result = performFleaHop(market, selectedCards[0], selectedCards[1]);
    if (result.success) {
      setMarket(result.newMarket);
      setSelectedCards([]);
      setMessage('Flea Hop successful!');
    } else {
      setMessage('Invalid Flea Hop. Select two cards of the same suit.');
    }
  };

  const handleDevilHop = () => {
    if (selectedCards.length !== 4 || money < 3) {
      setMessage('Select exactly four cards (one of each suit) and ensure you have enough money.');
      return;
    }
    const result = performDevilHop(market, selectedCards);
    if (result.success) {
      setMarket(result.newMarket);
      setMoney(money - 3);
      setSelectedCards([]);
      setMessage('Devil Hop successful!');
    } else {
      setMessage('Invalid Devil Hop. Select one card of each suit.');
    }
  };

  const handleWalkyTalky = () => {
    if (selectedCards.length !== 3 || money < 3) {
      setMessage('Select exactly three cards in a run and ensure you have enough money.');
      return;
    }
    const result = performWalkyTalky(market, selectedCards);
    if (result.success) {
      setMarket(result.newMarket);
      setMoney(money - 3);
      setSelectedCards([]);
      setMessage('Walky Talky successful!');
    } else {
      setMessage('Invalid Walky Talky. Select three cards in a run.');
    }
  };

  const handleZonkOut = () => {
    if (selectedCards.length !== 2) {
      setMessage('Select exactly two adjacent Zonkers or a Zonker and a Parking Lot.');
      return;
    }
    const result = performZonkOut(market, selectedCards);
    if (result.success) {
      setMarket(result.newMarket);
      setEasyGo([...easyGo, ...result.removedCards]);
      setSelectedCards([]);
      setMessage('Zonk Out successful!');
    } else {
      setMessage('Invalid Zonk Out. Select adjacent Zonkers or a Zonker and a Parking Lot.');
    }
  };

  const handleHangout = () => {
    const result = performHangout(market, selectedCards);
    if (result.success) {
      setMarket(result.newMarket);
      setEasyGo([...easyGo, ...result.removedCards]);
      setSelectedCards([]);
      setMessage('Hangout successful!');
    } else {
      setMessage('Invalid Hangout. Select a Parking Lot and its adjacent matching cards.');
    }
  };

  const handleEasyGo = () => {
    // Debugging logs
    console.log("Selected Cards:", selectedCards);
    console.log("Current Market:", market);
    console.log("Current Money:", money);

    if (selectedCards.length !== 2 || money < 1) {
      setMessage('Select exactly two adjacent cards of the same suit and ensure you have enough money.');
      return;
    }

    const result = performEasyGo(market, selectedCards);
    console.log("Easy Go Result:", result); // Log the result of performEasyGo

    if (result.success) {
      setMarket(result.newMarket);
      setEasyGo([...easyGo, ...selectedCards]);
      setMoney(money - 1);
      setSelectedCards([]);
      setMessage('Easy Go successful!');
    } else {
      setMessage('Invalid Easy Go. Cards must be adjacent and of the same suit.');
    }
  };

  const handleDesperado = () => {
    // Implement Desperado logic here
    setMessage('Desperado not yet implemented.');
  };

  const handleParkinglotgeddon = () => {
    // Implement Parkinglotgeddon logic here
    setMessage('Parkinglotgeddon not yet implemented.');
  };

  const handleQuadrun = () => {
    // Implement Quadrun logic here
    setMessage('Quadrun not yet implemented.');
  };

  const handleJamboree = () => {
    // Implement Jamboree logic here
    setMessage('Jamboree not yet implemented.');
  };

  const handleSnafu = () => {
    // Implement Snafu logic here
    setMessage('Snafu not yet implemented.');
  };

  const handleNewGame = () => {
    setRound(1);
    setScore(0);
    setStrikes(0);
    setMoney(0); // Ensure money is reset to $0 when starting a new game
    startNewRound();
  };

  const handleNewRound = () => {
    if (round < 3) {
      setRound(round + 1);
      startNewRound();
    } else {
      setMessage('Game over! Start a new game.');
    }
  };

  return (
    <div className="game-container">
      <h1 className="text-3xl font-bold mb-4">Flea Devil Solitaire</h1>
      <div className="game-info">
        <p>Money: ${money} | Score: {score} | Strikes: {strikes} | Round: {round}/3</p>
      </div>
      <div className="message">{message}</div>
      <div className="game-areas">
        <div className="bankroll-area">
          <h2 className="text-xl font-bold mb-2">Bankroll</h2>
          <div className="card-grid">
            {bankroll.map((card, index) => (
              <Card
                key={index}
                card={card}
                onClick={() => {}} // No action for bankroll cards
                selected={false}
              />
            ))}
          </div>
        </div>
        <div className="market-area">
          <h2 className="text-xl font-bold mb-2">Market</h2>
          <div className="card-grid">
            {market.map((card, index) => (
              <Card
                key={index}
                card={card}
                onClick={() => handleCardClick(card)}
                selected={selectedCards.includes(card)}
              />
            ))}
          </div>
        </div>
        <div className="easy-go-area">
          <h2 className="text-xl font-bold mb-2">Easy Go</h2>
          <div className="card-grid">
            {easyGo.map((card, index) => (
              <Card
                key={index}
                card={card}
                onClick={() => {
                  const updatedCard = { ...card, faceUp: !card.faceUp };
                  const updatedEasyGo = [...easyGo];
                  updatedEasyGo[index] = updatedCard;
                  setEasyGo(updatedEasyGo);
                }}
                selected={false}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="controls">
        <button onClick={handleHaul}>Haul</button>
        <button onClick={handleBargain}>Bargain ($1)</button>
        <button onClick={handleFleaHop}>Flea Hop</button>
        <button onClick={handleDevilHop}>Devil Hop ($3)</button>
        <button onClick={handleWalkyTalky}>Walky Talky ($3)</button>
        <button onClick={handleZonkOut}>Zonk Out</button>
        <button onClick={handleHangout}>Hangout</button>
        <button onClick={handleEasyGo}>Easy Go ($1)</button>
        <button onClick={handleDesperado}>Desperado</button>
        <button onClick={handleParkinglotgeddon}>Parkinglotgeddon</button>
        <button onClick={handleQuadrun}>Quadrun</button>
        <button onClick={handleJamboree}>Jamboree</button>
        <button onClick={handleSnafu}>Snafu</button>
        <button onClick={handleNewGame}>New Game</button>
        <button onClick={handleNewRound}>New Round</button>
        <button onClick={() => setIsRulesOpen(true)}>Rules</button>
      </div>
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
      <RulesReference />
    </div>
  );
};

export default Game;