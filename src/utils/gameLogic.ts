import { Card } from './types';

export function initializeDeck(): Card[] {
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, faceUp: true, isZonker: false, isParkingLot: false });
    }
  }

  // Add Zonkers and Parking Lots
  deck.push({ suit: '', rank: '', faceUp: true, isZonker: true, isParkingLot: false });
  deck.push({ suit: '', rank: '', faceUp: true, isZonker: true, isParkingLot: false });
  deck.push({ suit: '', rank: '', faceUp: true, isZonker: false, isParkingLot: true });
  deck.push({ suit: '', rank: '', faceUp: true, isZonker: false, isParkingLot: true });

  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function haul(market: Card[], selectedCards: Card[]): { success: boolean; newMarket: Card[] } {
  if (selectedCards.length < 2) {
    return { success: false, newMarket: market };
  }

  const rank = selectedCards[0].rank;
  const isValidHaul = selectedCards.every(card => card.rank === rank);

  if (!isValidHaul) {
    return { success: false, newMarket: market };
  }

  // Check if cards are adjacent
  const indices = selectedCards.map(card => market.indexOf(card)).sort((a, b) => a - b);
  const isAdjacent = indices.every((index, i) => i === 0 || index === indices[i - 1] + 1);

  if (!isAdjacent) {
    return { success: false, newMarket: market };
  }

  const newMarket = market.filter(card => !selectedCards.includes(card));
  return { success: true, newMarket };
}

export function performBargain(market: Card[], card1: Card, card2: Card): { success: boolean; newMarket: Card[] } {
  const index1 = market.indexOf(card1);
  const index2 = market.indexOf(card2);

  if (Math.abs(index1 - index2) !== 1) {
    return { success: false, newMarket: market };
  }

  const newMarket = [...market];
  [newMarket[index1], newMarket[index2]] = [newMarket[index2], newMarket[index1]];

  return { success: true, newMarket };
}

export function performFleaHop(market: Card[], card1: Card, card2: Card): { success: boolean; newMarket: Card[] } {
  if (card1.suit !== card2.suit) {
    return { success: false, newMarket: market };
  }

  const index1 = market.indexOf(card1);
  const index2 = market.indexOf(card2);

  // Check if there's a Zonker between the cards
  const minIndex = Math.min(index1, index2);
  const maxIndex = Math.max(index1, index2);
  const cardsBetween = market.slice(minIndex + 1, maxIndex);
  if (cardsBetween.some(card => card.isZonker)) {
    return { success: false, newMarket: market };
  }

  const newMarket = [...market];
  [newMarket[index1], newMarket[index2]] = [newMarket[index2], newMarket[index1]];

  return { success: true, newMarket };
}

export function performDevilHop(market: Card[], selectedCards: Card[]): { success: boolean; newMarket: Card[] } {
  if (selectedCards.length !== 4) {
    return { success: false, newMarket: market };
  }

  const suits = new Set(selectedCards.map(card => card.suit));
  if (suits.size !== 4) {
    return { success: false, newMarket: market };
  }

  const newMarket = [...market];
  const indices = selectedCards.map(card => market.indexOf(card));
  
  // Rotate the selected cards
  const temp = newMarket[indices[0]];
  for (let i = 0; i < 3; i++) {
    newMarket[indices[i]] = newMarket[indices[i + 1]];
  }
  newMarket[indices[3]] = temp;

  return { success: true, newMarket };
}

export function performWalkyTalky(market: Card[], selectedCards: Card[]): { success: boolean; newMarket: Card[] } {
  if (selectedCards.length !== 3) {
    return { success: false, newMarket: market };
  }

  const [card1, card2, card3] = selectedCards;
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
  const index1 = ranks.indexOf(card1.rank);
  const index2 = ranks.indexOf(card2.rank);
  const index3 = ranks.indexOf(card3.rank);

  if (!(index2 === index1 + 1 && index3 === index2 + 1)) {
    return { success: false, newMarket: market };
  }

  const newMarket = [...market];
  const cardIndex = newMarket.indexOf(card2);
  const targetIndex = newMarket.findIndex(card => card.rank === card2.rank && card !== card2);

  if (targetIndex === -1) {
    return { success: false, newMarket: market };
  }

  [newMarket[cardIndex], newMarket[targetIndex]] = [newMarket[targetIndex], newMarket[cardIndex]];

  return { success: true, newMarket };
}

export function performZonkOut(market: Card[], selectedCards: Card[]): { success: boolean; newMarket: Card[]; removedCards: Card[] } {
  if (selectedCards.length !== 2) {
    return { success: false, newMarket: market, removedCards: [] };
  }

  const [card1, card2] = selectedCards;
  const index1 = market.indexOf(card1);
  const index2 = market.indexOf(card2);

  if (Math.abs(index1 - index2) !== 1) {
    return { success: false, newMarket: market, removedCards: [] };
  }

  if ((card1.isZonker && card2.isZonker) || (card1.isZonker && card2.isParkingLot) || (card1.isParkingLot && card2.isZonker)) {
    const newMarket = market.filter(card => !selectedCards.includes(card));
    return { success: true, newMarket, removedCards: selectedCards };
  }

  return { success: false, newMarket: market, removedCards: [] };
}

export function performHangout(market: Card[], selectedCards: Card[]): { success: boolean; newMarket: Card[]; removedCards: Card[] } {
  if (selectedCards.length < 2) {
    return { success: false, newMarket: market, removedCards: [] };
  }

  const parkingLot = selectedCards.find(card => card.isParkingLot);
  if (!parkingLot) {
    return { success: false, newMarket: market, removedCards: [] };
  }

  const parkingLotIndex = market.indexOf(parkingLot);
  const adjacentCards = selectedCards.filter(card => !card.isParkingLot);

  const isValid = adjacentCards.every(card => {
    const cardIndex = market.indexOf(card);
    return Math.abs(cardIndex - parkingLotIndex) === 1;
  });

  if (!isValid) {
    return { success: false, newMarket: market, removedCards: [] };
  }

  const newMarket = market.filter(card => !selectedCards.includes(card));
  return { success: true, newMarket, removedCards: selectedCards };
}

export function performEasyGo(market: Card[], selectedCards: Card[]): { success: boolean; newMarket: Card[] } {
  if (selectedCards.length !== 2) {
    return { success: false, newMarket: market };
  }

  const [card1, card2] = selectedCards;
  const index1 = market.indexOf(card1);
  const index2 = market.indexOf(card2);

  // Check if cards are adjacent
  if (Math.abs(index1 - index2) !== 1) {
    return { success: false, newMarket: market };
  }

  // Check if cards have the same suit
  if (card1.suit !== card2.suit) {
    return { success: false, newMarket: market };
  }

  // Remove the selected cards from the market
  const newMarket = market.filter(card => !selectedCards.includes(card));

  return { success: true, newMarket };
}