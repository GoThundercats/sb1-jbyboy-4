import React, { useState, useEffect } from 'react';
import { Card as CardType } from '../utils/types';
import { initializeDeck, shuffleDeck, haul, performBargain, performFleaHop, performDevilHop, performWalkyTalky, performZonkOut, performHangout, performEasyGo, performQuadrun, moveCardFromBankrollToEasyGo } from '../utils/gameLogic';
import Card from './Card';
import RulesModal from './RulesModal';
import RulesReference from './RulesReference';

const Game: React.FC = () => {
  const [, setDeck] = useState<CardType[]>([]);
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
  const [parkingLotMoved, setParkingLotMoved] = useState(false);
  const [lastState, setLastState] = useState<{ market: CardType[]; easyGo: CardType[]; bankroll: CardType[]; money: number } | null>(null);
  const [snafuUsed, setSnafuUsed] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    startNewRound();
  }, []);

  const saveState = () => {
    setLastState({
      market: [...market],
      easyGo: [...easyGo],
      bankroll: [...bankroll],
      money,
    });
  };

  const startNewRound = () => {
    if (isGameOver) {
      setMessage('Game Over! Please start a new game.');
      return;
    }
    const newDeck = initializeDeck();
    const shuffledDeck = shuffleDeck(newDeck);
    setDeck(shuffledDeck);
    setMarket(shuffledDeck);
    setBankroll([]);
    setEasyGo([]);
    setSelectedCards([]);
    setMoney(0); // Set initial money to $0
    setParkingLotMoved(false);
    setLastState(null);
    setSnafuUsed(false);
    console.log("Money set to:", 0); // Debug log
    setMessage('New round started. Select a Parking Lot to move to the end of the deck.');
    setRound(prevRound => prevRound + 1); // Increment round
    console.log(`Round ${round + 1} started.`);
  };

  const handleCardClick = (card: CardType) => {
    if (!parkingLotMoved && card.isParkingLot) {
      // Move the selected Parking Lot to the end of the market
      saveState();
      const newMarket = market.filter(c => c !== card);
      newMarket.push(card);
      setMarket(newMarket);
      setParkingLotMoved(true);
      setMessage('Parking Lot moved. Select a move to begin.');
      return;
    }

    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter(c => c !== card));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleHaul = () => {
    if (!parkingLotMoved) {
      setMessage('You must move a Parking Lot to the end of the deck first.');
      handleStrike();
      return;
    }
  
    saveState();
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
      handleStrike(); // Add a strike for an invalid move
    }
  };
  
  const handleBargain = () => {
    if (!parkingLotMoved) {
      setMessage('You must move a Parking Lot to the end of the deck first.');
      return;
    }

    if (selectedCards.length !== 2 || money < 1) {
      setMessage('Select exactly two adjacent cards and ensure you have enough money.');
      return;
    }
    saveState();
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
    if (selectedCards.length !== 1) {
      setMessage('Select exactly one card to Flea Hop.');
      return;
    }
  
    const selectedCard = selectedCards[0];
    let suitGroup = [];
  
    // Identify all possible contiguous groups of cards with the same suit
    for (let i = 0; i < market.length; i++) {
      if (market[i].suit === selectedCard.suit) {
        if (suitGroup.length === 0) {
        }
        suitGroup.push(market[i]);
      } else if (suitGroup.length > 0 && market[i].suit !== selectedCard.suit) {
        // End of current contiguous group
        if (suitGroup.includes(selectedCard)) {
          break; // We found the group with the selected card
        } else {
          // Reset to find another potential contiguous group
          suitGroup = [];
        }
      }
    }
  
    // Ensure the selected card is part of the suit group
    if (!suitGroup.includes(selectedCard) || suitGroup.length < 2) {
      setMessage('Not enough cards of the same suit for a Flea Hop.');
      return;
    }
  
    const leftmost = suitGroup[0];
    const rightmost = suitGroup[suitGroup.length - 1];
    let direction: 'left' | 'right' = 'right';
    let maxMoveBy = 0;
  
    // Determine if the selected card is the leftmost or rightmost in the contiguous group
    if (selectedCard === leftmost) {
      direction = 'left';
      maxMoveBy = suitGroup.length - 1; // The maximum number of hops is the length of the group minus 1
    } else if (selectedCard === rightmost) {
      direction = 'right';
      maxMoveBy = suitGroup.length - 1; // The maximum number of hops is the length of the group minus 1
    } else {
      setMessage('Selected card must be the leftmost or rightmost card of the suit group.');
      return;
    }
  
    const moveBy = parseInt(prompt(`How many spaces do you want to hop? (1 to ${maxMoveBy})`) || '0', 10);
    if (isNaN(moveBy) || moveBy < 1 || moveBy > maxMoveBy) {
      setMessage('Invalid number of spaces to hop.');
      return;
    }
  
    const result = performFleaHop(market, selectedCard, moveBy, direction);
  
    if (result.success) {
      setMarket(result.newMarket);
      setSelectedCards([]);
      setMessage('Flea Hop successful!');
    } else {
      setMessage('Invalid Flea Hop. Cannot land beside a card of the same suit.');
    }
  };
  
  
  

  const handleSnafu = () => {
    if (lastState) {
      setMarket(lastState.market);
      setEasyGo(lastState.easyGo);
      setBankroll(lastState.bankroll);
      setMoney(lastState.money);
      setSelectedCards([]);
      setMessage('Undo successful!');
      if (snafuUsed) {
        setStrikes(prevStrikes => prevStrikes + 1);
      } else {
        setSnafuUsed(true);
      }
    } else {
      setMessage('No moves to undo.');
    }
  };

  // Example update in Game.tsx

// Function to handle moving a card from the bankroll to Easy Go area
const handleMoveCardToEasyGo = (card: CardType) => {
  if (money < 1) {
    setMessage('Not enough money to move a card from Bankroll to Easy Go.');
    return;
  }

  // Call game logic to move card
  const { success, newBankroll, newEasyGo } = moveCardFromBankrollToEasyGo(bankroll, easyGo, card);

  if (success) {
    setBankroll(newBankroll);
    setEasyGo(newEasyGo);
    setMoney(prevMoney => prevMoney - 1);
    setMessage('Moved card from Bankroll to Easy Go for $1.');
  } else {
    setMessage('Failed to move card from Bankroll to Easy Go.');
  }
};



// In the JSX (inside the bankroll area)





  const handleDevilHop = () => {
    if (!parkingLotMoved) {
      setMessage('You must move a Parking Lot to the end of the deck first.');
      return;
    }

    if (selectedCards.length !== 4 || money < 3) {
      setMessage('Select exactly four cards (one of each suit) and ensure you have enough money.');
      return;
    }
    saveState();
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
    if (!parkingLotMoved) {
      setMessage('You must move a Parking Lot to the end of the deck first.');
      return;
    }

    if (selectedCards.length !== 3 || money < 3) {
      setMessage('Select exactly three cards in a run and ensure you have enough money.');
      return;
    }
    saveState();
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
    if (!parkingLotMoved) {
      setMessage('You must move a Parking Lot to the end of the deck first.');
      return;
    }

    if (selectedCards.length !== 2) {
      setMessage('Select exactly two adjacent Zonkers or a Zonker and a Parking Lot.');
      return;
    }
    saveState();
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
    if (!parkingLotMoved) {
      setMessage('You must move a Parking Lot to the end of the deck first.');
      return;
    }

    saveState();
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
    if (selectedCards.length !== 2 || money < 1) {
      setMessage('Select exactly two adjacent cards of the same suit and ensure you have enough money.');
      return;
    }

    saveState();
    const result = performEasyGo(market, selectedCards);

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
    const royalCards = easyGo.filter(card => card.rank === 'J' || card.rank === 'Q' || card.rank === 'K' && card.faceUp);
    if (royalCards.length >= 3) {
      saveState();
      const cardsToTurnDown = royalCards.slice(0, 3); // Select only the first 3 cards
      const updatedEasyGo = easyGo.map(card =>
        cardsToTurnDown.includes(card) ? { ...card, faceUp: false } : card
      );
      setEasyGo(updatedEasyGo);
      setMoney(prevMoney => prevMoney + 1);
      setMessage('Desperado successful! 3 royal cards have been turned face down, and $1 added.');
    } else {
      setMessage('Desperado failed. Not enough royal cards in the Easy Go area.');
    }
  };
  

  const handleParkinglotgeddon = () => {
    if (!parkingLotMoved) {
      setMessage('You must move a Parking Lot to the end of the deck first.');
      return;
    }

    const otherParkingLot = market.find(card => card.isParkingLot && !card.faceUp);
    if (otherParkingLot && market.indexOf(otherParkingLot) === market.length - 1) {
      saveState();
      const newMarket = market.filter(card => card !== otherParkingLot);
      const adjacentCards = [market[market.length - 2]];

      setMarket(newMarket);
      setEasyGo(prevEasyGo => [...prevEasyGo, { ...otherParkingLot, faceUp: false }, ...adjacentCards.filter(Boolean)]);
      setMessage('Parkinglotgeddon activated! Parking Lot moved to Easy Go.');
    } else {
      setMessage('Parkinglotgeddon failed. The other Parking Lot must be at the end of the Market.');
    }
  };

  const handleJamboree = () => {
    if (!parkingLotMoved) {
      setMessage('You must move a Parking Lot to the end of the deck first.');
      return;
    }

    const availableMoves = [
      handleHaul,
      handleBargain,
      handleFleaHop,
      handleDevilHop,
      handleWalkyTalky,
      handleZonkOut,
      handleHangout,
      handleEasyGo
    ];
    const hasMove = availableMoves.some(move => {
      try {
        move();
        return true;
      } catch {
        return false;
      }
    });

    if (!hasMove) {
      setMessage('It is a Jamboree! You have won the game. Please select new game to continue.');
    } else {
      setMessage('Moves are still available. Jamboree not possible.');
    }
  };

  const handleQuadrun = () => {
    if (!parkingLotMoved) {
      setMessage('You must move a Parking Lot to the end of the deck first.');
      return;
    }

    if (selectedCards.length !== 4) {
      setMessage('Select exactly four adjacent cards of the same rank.');
      return;
    }
    saveState();
    const result = performQuadrun(market, selectedCards);
    if (result.success) {
      setMarket(result.newMarket);
      setBankroll([...bankroll, ...selectedCards.map(card => ({ ...card, faceUp: false }))]);
      setSelectedCards([]);
      setMessage('Quadrun successful!');
    } else {
      setMessage('Invalid Quadrun. Select four adjacent cards of the same rank.');
    }
  };
  const handleNewGame = () => {
    setIsGameOver(false);
    setStrikes(0);
    setRound(0);
    setMoney(0);
    setScore(0);
    setMessage('New game started. Select a move to begin.');
    startNewRound();
  };

  const handleNewRound = () => {
    if (!isGameOver) {
      startNewRound();
    } else {
      setMessage('Game is over. Please start a new game.');
    }
  };

  const endGame = () => {
    setIsGameOver(true);
    setMessage('You have reached 3 strikes. Game Over!');
  };

  const handleStrike = () => {
    setStrikes(prevStrikes => {
      const updatedStrikes = prevStrikes + 1;
      if (updatedStrikes >= 3) {
        endGame();
      }
      return updatedStrikes;
    });
  };

  /**
   * Calculates the total score based on the Easy Go area.
   * - FacesNumber: Incremental sum based on face-up J, Q, K cards.
   * - AcesNumber: Count of face-up Aces and number cards (2-10).
   * - Total Score = acesNumber * facesNumber
   */
  const calculateScore = (): number => {
    let facesNumber = 0;
    let acesNumber = 0;

    // Extract face-up J, Q, K cards
    const faceUpFaceCards = easyGo.filter(
      card => card.faceUp && ['J', 'Q', 'K'].includes(card.rank)
    );
    const numberOfFaceCards = faceUpFaceCards.length;

    // Calculate FacesNumber: 1 + 2 + ... + n = n(n + 1)/2
    facesNumber = (numberOfFaceCards * (numberOfFaceCards + 1)) / 2;

    // Extract face-up Aces and number cards (2-10)
    const faceUpOthers = easyGo.filter(card =>
      card.faceUp &&
      (card.rank === 'A' || (parseInt(card.rank) >= 2 && parseInt(card.rank) <= 10))
    );
    acesNumber = faceUpOthers.length;

    // Bonus: If there are face cards but no Aces/number cards, set acesNumber to 1
    if (facesNumber > 0 && acesNumber === 0) {
      acesNumber = 1;
    }

    // Bonus: If there are Aces/number cards but no face cards, set facesNumber to 1
    if (acesNumber > 0 && facesNumber === 0) {
      facesNumber = 1;
    }

    // Calculate total score
    const totalScore = acesNumber * facesNumber;

    return totalScore;
  };

  /**
   * useEffect hook to recalculate the score whenever the Easy Go area changes.
   */
  useEffect(() => {
    const newScore = calculateScore();
    setScore(newScore);
  }, [easyGo]);

  return (
    <div className="game-container">
      <h1 className="text-3xl font-bold mb-4">Flea Devil Solitaire</h1>
      <div className="status-bar">
        <p>Round: {round}</p>
        <p>Strikes: {strikes} / 3</p>
        <p>Money: ${money}</p>
        <p>Score: {score}</p>
        <p>{message}</p>
      </div>
      
      <div className="bankroll-area">
  <h2 className="text-xl font-bold mb-2">Bankroll</h2>
  <div className="card-grid">
    {bankroll.map((card, index) => (
      <Card
        key={index}
        card={card}
        onClick={() => handleMoveCardToEasyGo(card)} // Add the move action to each card
        selected={false}
      />
    ))}
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
                  if (card.faceUp) {
                    const updatedCard = { ...card, faceUp: !card.faceUp };
                    const updatedEasyGo = [...easyGo];
                    updatedEasyGo[index] = updatedCard;
                    setEasyGo(updatedEasyGo);
                  }
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
        <button onClick={handleEasyGo}>Easy Go ($1)</button>
        <button onClick={handleDevilHop}>Devil Hop ($3)</button>
        <button onClick={handleWalkyTalky}>Walky Talky ($3)</button>
        <button onClick={handleZonkOut}>Zonk Out</button>
        <button onClick={handleHangout}>Hangout</button>
        
        <button onClick={handleDesperado}>Desperado</button>
        <button onClick={handleParkinglotgeddon}>Parkinglotgeddon</button>
        <button onClick={handleQuadrun}>Quadrun</button> {/* Function not defined */}
        <button onClick={handleJamboree}>Jamboree</button>
        <button onClick={handleSnafu}>Snafu</button>
        <button onClick={handleNewGame}>New Game</button>
        <button onClick={handleNewRound}>New Round</button>
        <button onClick={() => setIsRulesOpen(true)}>Rules</button>
      </div>
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
      <RulesReference />
      {isGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-message">
            <h2>Game Over!</h2>
            <p>You have reached 3 strikes.</p>
            <button onClick={handleNewGame}>Start New Game</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;

