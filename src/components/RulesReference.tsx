import React from 'react';

const RulesReference: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-2">Quick Rules Reference</h3>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Haul:</strong> Remove adjacent cards of the same rank</li>
        <li><strong>Flea Hop:</strong> Move a card within a set of the same suit for free</li>
        <li><strong>Easy Go (<span style={{ color: 'red' }}>$1</span>):</strong> Remove a pair of adjacent cards with the same suit</li>
        <li><strong>Bargain (<span style={{ color: 'red' }}>$1</span>):</strong> Swap the position of any two adjacent cards</li>
      
        <li><strong>Devil Hop (<span style={{ color: 'red' }}>$3</span>):</strong> Move a set of four cards (one of each suit)</li>
        <li><strong>Hangout (<span style={{ color: 'red' }}>$3</span>):</strong> Remove matching cards flanking a Parking Lot</li>
        <li><strong>Walky Talky (<span style={{ color: 'red' }}>$3</span>):</strong> Move the middle card of a run to a matching card</li>
        <li><strong>Desperado(<span style={{ color: 'green' }}>$1</span>):</strong> Turn three Royalties face-down in Easy Go for <span style={{ color: 'green' }}>$1</span></li>

       
        <li><strong>Zonk Out:</strong> Remove adjacent Zonkers or a Zonker next to a Parking Lot</li>
        
        <li><strong>Parkinglotageddon:</strong> Move a Parking Lot to Easy Go when it meets the other at the bottom</li>
        <li><strong>Quadrun:</strong> Haul four adjacent matching cards and a second set of four</li>
        <li><strong>Jamboree:</strong> No initial moves available; counts as a win with zero score</li>
        <li><strong>Snafu:</strong> End the round due to a mistake. First is free; subsequent ones add a strike</li>
      </ul>
      <p className="mt-2 text-sm italic">YOU CAN MOVE CARDS FROM THE BANKROLL TO EASY GO BY CLICKING CARD IN BANKROLL COST = $1. Game is played over 3 rounds. Score is the total of all rounds.
      Strategy
      Choosing which Parking Lot to move to the bottom of the deck is the first choice you make each round. Proximity to potential Hangout and Zonk Outs can inform this choice. After this, you need to build up your Bankroll – so find natural Hauls, and make Hauls with Flea Hops and Hangouts. Once you have some Bankroll you can Bargain into more Hauls. Always look at the Flea Hop potential to make a Haul. Walky Talky can help when everything is far away. Always Zonk Out. When Hauling Royalties, you always need to consider the state of the game, if you can afford to Score them as opposed to Banking them? This can be a tough choice, and can really affect the round. Royalty pairs at the edges of the market can be saved till the situation is clearer. Toward endgame, if the Market is tough, you need to figure out which Hauls to go for, considering the Flea Hops that can help. Remember, every Haul brings all the cards closer together – so even if things look bleak, you can often pull off a win.
      </p>
    </div>
  );
};

export default RulesReference;