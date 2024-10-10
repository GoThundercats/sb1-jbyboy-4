import React from 'react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4">Flea Devil Solitaire Rules</h2>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Introduction</h3>
          <p>
            Flea Devil Solitaire is a unique card game invented by Frank Edward Nora over the course of 16 years (2007–2023). From its origin as "Shufflin' Jamboreee", to its slow development over the years, to the flurry of activity in 2022 which led to its penultimate form, to the summer 2023 breakthroughs, every step can be heard on Frank's show, The Overnightscape.
          </p>
          <p>
            This game is a companion to Onsug Radio, and can be played while listening. Flea Devil Solitaire is unique in that you hold the deck in your hands at all times – there is no need to place cards on a flat surface at any time. It also can be paused at any time. It's a pocket game system and natural digital detox.
          </p>
          <p>
            The theme of the game is buying and selling items at a flea market. That's where the name comes from – "Flea Devil" is a made-up term for someone who is very good at buying and selling things at a flea market.
          </p>
          <p>
          Flea Devil Solitaire is a unique card game invented by Frank Edward Nora over the course of 16 years (2007–2023). From its origin as “Shufflin’ Jamboreee”, to its slow development over the years, to the flurry of activity in 2022 which led to its penultimate form, to the summer 2023 breakthroughs, every step can be heard on Frank’s show, The Overnightscape.

This game is a companion to Onsug Radio, and can be played while listening. Flea Devil Solitaire is unique in that you hold the deck in your hands at all times –

there is no need to place cards on a flat surface at any time. It also can be paused at any time. It’s a pocket game system and natural digital detox.



The theme of the game is buying and selling items at a flea market. That’s where the name comes from – “Flea Devil” is a made-up term for someone who is very good at buying and selling things at a flea market.



Being so different from other games, Flea Devil Solitaire can take some time to learn. But once you know it, the deck of cards you’ve always had will become your best friend. It’s a whole new leisure pursuit!



License for these game rules: Creative Commons Attribution-NonCommercial- NoDerivatives 4.0 International (CC BY-NC-ND 4.0) (https://creativecommons.org/ licenses/by-nc-nd/4.0/). Attribution: by Frank Edward Nora – more info at onsug. com

<h3 className="text-2xl font-semibold">Overview</h3>

A Flea Devil Solitaire game is played over a number of rounds. Each round can end in a win, with a score, or a loss, which counts as a strike. Keep playing rounds till you reach your third strike, which ends the game. Then add up your score.

<h3 className="text-2xl font-semibold">Equipment</h3>

Flea Devil Solitaire game uses a 56-card deck – a standard 52-card deck of playing cards, plus two Zonkers (jokers) and two Parking Lots (the other 2 cards that come in most decks). You’ll also need a way to keep score – paper or digital.

<h3 className="text-2xl font-semibold">Zonkers</h3>

Zonkers represent weirdos hanging out at the flea market, and are represented by jokers. Unlike jokers – Zonkers are not wild – they just get in the way, and prevent Flea Hops. They have no suit or rank.



Whenever the two Zonkers are adjacent, you can Zonk Out and send one of them face down to the Easy Go, for free. Also, if a Zonker is adjacent to a Parking Lot, you can Zonk Out for free.

<h3 className="text-2xl font-semibold">Parking Lots</h3>

Parking Lots are represented by the two additional cards that come with most playing card decks. Ideally, they should have the same cardback as the rest of the cards – as is the case in some higher-end decks. But it will work no matter what is on the extra cards.



After shuffling, the first move of the round is to choose one of the two Parking Lots to move to the bottom of the deck – to make a dividing line between the Market and the Easy Go (see more details below). If one of the Parking Lots is already at the bottom, you can choose to keep it at the bottom and that counts as moving it..Note that no card in the Market can be moved under this dividing line.



Then, before making any moves, check for a “Hangout” around the other Parking Lot – two cards of the same rank on either side of the Parking Lot. If so, then both those cards – plus their matches – may be hauled for free. If this then brings another matched pair on either side of the Parking Lot, those also and their matches can be removed for free. (After this starting phase, the Hangout move can be done for $3). During this phase, Zonk Outs can also be done (so for example, you can Zonk Out a Zonker next to a Parking Lot, and if that brings up a Hangout – it can still be done for free, since it’s before regular gameplay starts).



Note that if both Parking Lots have Hangouts in the initial Market – you still need to move one Parking Lot to the bottom before doing the Hangouts – so only one Parking Lot can benefit from the initial Hangout(s).



As mentioned above, any time a Zonker is adjacent to a Parking Lot, it can be Zonked Out for free.



<h3 className="text-2xl font-semibold">Areas</h3>

There are 3 areas in the game. The Market is the main face-up set of cards. The Bankroll is the set of face-down cards above the Market, and the Easy Go is the set of face-down and face-up cards below the Market.

<h3 className="text-2xl font-semibold">Shuffling</h3>

You can shuffle the deck any way you like, but in keeping with the “table free” nature of the game, shuffling in hand is recommended. I use a combination of overhand and (imperfect) faro shuffles (look them up).

<h3 className="text-2xl font-semibold">Jamboree</h3>

When at round start, after you move your Parking Lot, if you have no Hauls in the Market, and no Flea Hops, Zonk Outs, or Hangouts to make Hauls – meaning you can’t get started at all – you have a Jamboree. This counts as a win, with zero score, and adds one free “strike” to the strike total.

<h3 className="text-2xl font-semibold">Play</h3>

Once the cards are shuffled, turn the deck face-up. This is the Market.



In the opening phase, your first move is to move one of the Parking Lots to the bottom of the Market. Then, in the second part of the opening phase, before you make any moves, you may Zonk Out Zonkers, and take free Hangouts if available. Then, regular play begins.



You can “Browse” through the Market without limit, while keeping the order unchanged. There are 7 different moves that can be made. Note: all moves are optional, never “forced” (besides the opening move of putting a Parking Lot on the bottom, which is “forced”).


<h3 className="text-2xl font-semibold">Haul</h3>
Haul – when 2 cards of the same rank (like 44 or KK) are adjacent (next to each other) you can remove them from the deck. If they are Stuff (ranks 2 through 10) – place them face down above the market in the Bankroll. Each card in the Bankroll is worth one dollar. If they are Royalties (ranks J-Q-K-A), you can choose to Bank them, just like Stuff, or Score them, by placing them face-up in the Easy Go. Note that when a pair of Royalties is Hauled, you can choose to split them – Banking one and Scoring one. Note that any of these moves cannot be reversed once done.


<h3 className="text-2xl font-semibold">Bargain</h3>
Bargain – you can swap the position of any two adjacent cards in the Market by paying one dollar. To pay one dollar, move a card from the Bankroll to the Easy Go, keeping it face down.


<h3 className="text-2xl font-semibold">Flea Hop</h3>
Flea Hop – move a card one or more spaces for free – this is the essential move in Flea Devil Solitaire! In the Market, find a continuous set of two or more cards of the same suit. The leftmost or rightmost of these cards can jump away from the set – moving one or more spaces, by “pushing off” the rest of the cards in the set. For example, if there are three clubs in a row, a jump of one or two spaces can be made. If there are five clubs in a row, a jump of one to four cards can be made. Once the card “lands” from the hop, it may not be in contact with a card of its same suit or a Zonker – so check beforehand. (You can jump over a card of the same suit – what matters is what cards are next to it when it lands).


<h3 className="text-2xl font-semibold">Devil Hop</h3>
Devil Hop – a “Devil” is a set of four adjecant cards with one of each suit. If there are two or more Devils in the market, you can Devil Hop. Pay three dollars, and move one Devil next to another Devil. This is a big move that can really change things!


<h3 className="text-2xl font-semibold">Walky Talky</h3>
Walky Talky – find a run of three cards in the Market, forward or backward (like 3-4-5 or Q-J-10), the middle card can move next to a matching card in the Market, for three dollars. Note that 2-A-K and K-A-2 are allowed. If the moved cards are Stuff (ranks 2 through 10) – you may turn them into Antiques as opposed to Banking them. To do this, place one or both of the Stuff cards face-up in the Easy Go. At round end, each Antique counts as an Ace


<h3 className="text-2xl font-semibold">Zonkout</h3>
Zonk Out – if two Zonkers are adjacent in the Market, you can move one of them face-down to the Easy Go. You can also Zonk Out if a Zonker is adjacent to a Parking Lot.


<h3 className="text-2xl font-semibold">Hangout</h3>
Hangout – if there are two cards of the same rank on either side of a single Parking Lot, you may Haul both, along with their matches, if still in the Market, for $3. This is a very powerful move! (Note that, at the very start of the game, this move can be done for free – see above).


<h3 className="text-2xl font-semibold">Desperado</h3>
Desperado – Three Royalties in the Easy Go can be turned face down in the Easy Go to give you $1. Note that each Antique also counts as a Royality for this. Obviously, you would only do this if you are desperate – as it is taking away from your final score. But it can save the game, sometimes!


<h3 className="text-2xl font-semibold">Parkinglotgeddon</h3>
Parkinglotageddon – When the other Parking Lot reaches the one at the bottom of the Market, you can send it face down to the Easy Go, and then also teleport the card that was next to it anywhere in the Easy Go. (Note that if both Parking Lots are touching at start of round, Parkinglotageddon doesn’t apply, since one must be moved to the bottom of the Market before anything else can happen).


<h3 className="text-2xl font-semibold">Quadrun</h3>
Quadrun – if you Haul four of matching adjacent cards, you can then Haul another set of four matching cards from anywhere in the Market. Note that if there are no more sets of four left, you cannot settle for a pair – it must be a set of four.

<h3 className="text-2xl font-semibold">Snafu</h3>

Mistakes happen in life, and Flea Devil Solitaire is no exception. From dropping cards, to messing up hauls, to shuffling a game in progress, Snafus are going to happen.



If you make an unintentional mistake, and can’t undo it, that’s a Snafu. The round ends, and you notate a Snafu on your score. The first Snafu is free, counts as a win, and scores zero – but subsequent Snafus in the same game count as a loss, and add a strike.





<h3 className="text-2xl font-semibold">Scoring</h3>

A round can end with a win (by clearing the Market so that only the two Parking Lots, and any remaining Zonkers are left) or a loss (running out of moves before the Market is cleared). Note that you can concede and take a loss at any time in a round.



If won, a round is scored based on the Royalty Scores in the Easy Go. The Bankroll does not count for scoring. Face cards score 1 for the first one, 2 for the second, etc. Multiply the face card score by the number of aces (zero aces counts as one for this purpose). Each Antique (Stuff card) in the Easy Go counts as one Ace. Note that you can win with a score of zero (called a “Wash”). Since this is a bit tough to calculate, use the scoring chart. You can move all the face up Royalties to the top of the deck to make scoring easier (separating Faces and Aces).



Play a sequence of rounds, where each loss is one strike. Play until you reach 3 strikes. Add up the score of all the won rounds. This is your final score.



Can you reach 1,000 points in a single game?





<h3 className="text-2xl font-semibold">Strategy</h3>

Choosing which Parking Lot to move to the bottom of the deck is the first choice you make each round. Proximity to potential Hangout and Zonk Outs can inform this choice.



After this, you need to build up your Bankroll – so find natural Hauls, and make Hauls with Flea Hops and Hangouts. Once you have some Bankroll you can Bargain into more Hauls. Always look at the Flea Hop potential to make a Haul. Walky Talky can help when everything is far away. Always Zonk Out. When Hauling Royalties, you always need to consider the state of the game, if you can afford to Score them as opposed to Banking them? This can be a tough choice, and can really affect the round. Royalty pairs at the edges of the market can be saved till the situation is clearer. Toward endgame, if the Market is tough, you need to figure out which Hauls to go for, considering the Flea Hops that can help. Remember, every Haul brings all the cards closer together – so even if things look bleak, you can often pull off a win.

<h3 className="text-2xl font-semibold">Shortcuts</h3>

When you get the hang of the game, you can take shortcuts. For example, if a Haul is one away, spend $1 and then Haul the two cards, without first moving them together. If there’s a Haul two cards apart, and you have at least two dollars in the Bankroll, you can have them pay for themselves, and move straight to the Easy Go. How you handle shortcuts is completely up to you.

<h3 className="text-2xl font-semibold">The Deck</h3>

Playing Flea Devil Solitaire is much easier with the right deck. Premium cards with “silky” finishes tend to work better. Also, playing demands a degree of manual dexterity. If it doesn’t come naturally, it will improve over time. Decks can even seem to have different “personalities” – some give you more wins, some less. The best deck I have found to play with is “The Beatles” deck from Theory Eleven.



Zonkertop

If there’s a Zonker at the top of the Market, it means the game will be that much easier. So Zonkertop means cool, nice, excellent, etc.


          </p>

          
          <h3 className="text-2xl font-semibold">Basic Moves</h3>
          <ul className="list-disc list-inside">
            <li><strong>Haul:</strong> Remove adjacent cards of the same rank</li>
            <li><strong>Bargain ($1):</strong> Swap the position of any two adjacent cards</li>
            <li><strong>Flea Hop:</strong> Move a card within a set of the same suit (free)</li>
            <li><strong>Devil Hop ($3):</strong> Move a set of four cards (one of each suit)</li>
            <li><strong>Walky Talky ($3):</strong> Move the middle card of a run to a matching card</li>
            <li><strong>Zonk Out:</strong> Remove adjacent Zonkers or a Zonker next to a Parking Lot</li>
            <li><strong>Hangout:</strong> Remove a Parking Lot and its adjacent matching cards</li>
            <li><strong>Easy Go ($1):</strong> Remove a pair of adjacent cards with the same suit</li>
          </ul>

          <p className="mt-4 text-sm italic">
            License for these game rules: Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) (https://creativecommons.org/licenses/by-nc-nd/4.0/). Attribution: by Frank Edward Nora – more info at onsug.com
          </p>
        </div>

        {/* Score Sheet Table */}
        <h2 className="text-2xl font-bold mb-4">Flea Devil Solitaire Rules</h2>
        <h3 className="text-xl font-bold mb-2">Score Sheet</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2">0-1 Ace</th>
                <th className="border border-gray-300 px-4 py-2">2 Aces</th>
                <th className="border border-gray-300 px-4 py-2">3 Aces</th>
                <th className="border border-gray-300 px-4 py-2">4 Aces</th>
                <th className="border border-gray-300 px-4 py-2">5 Aces</th>
                <th className="border border-gray-300 px-4 py-2">6 Aces</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["0 Faces", 0, 0, 0, 0, 0, 0],
                ["1 Face", 1, 2, 3, 4, 5, 6],
                ["2 Faces", 3, 6, 9, 12, 15, 18],
                ["3 Faces", 6, 12, 18, 24, 30, 36],
                ["4 Faces", 10, 20, 30, 40, 50, 60],
                ["5 Faces", 15, 30, 45, 60, 75, 90],
                ["6 Faces", 21, 42, 63, 84, 105, 126],
                ["7 Faces", 28, 56, 84, 112, 140, 168],
                ["8 Faces", 36, 72, 108, 144, 180, 216],
                ["9 Faces", 45, 90, 135, 180, 225, 270],
                ["10 Faces", 55, 110, 165, 220, 275, 330],
                ["11 Faces", 66, 132, 198, 264, 330, 396],
                ["12 Faces", 78, 156, 234, 312, 390, 468],
              ].map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-gray-300 px-4 py-2 text-center">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close Rules
        </button>
      </div>
    </div>
  );
};


export default RulesModal;