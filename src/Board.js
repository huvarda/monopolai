import {React, useState} from 'react';
import FullscreenPopup from "./FullScreenPopup";
let tiles = [{x: 850, y: 850},
{x: 700, y: 850},
{x: 580, y: 850},
{x: 464, y: 850},
{x: 360, y: 850},
{x: 240, y: 850},
{x: 57, y: 885},
{x: 100, y: 706},
{x: 100, y: 587},
{x: 100, y: 472},
{x: 100, y: 350},
{x: 100, y: 250},
{x: 100, y: 100},
{x: 240, y: 100},
{x: 360, y: 100},
{x: 464, y: 100},
{x: 580, y: 100},
{x: 690, y: 100},
{x: 850, y: 100},
{x: 850, y: 250},
{x: 850, y: 360},
{x: 850, y: 480},
{x: 850, y: 588},
{x: 850, y: 700},

]

export function Board({ ctx, G, moves }) {
const [showPopup, setShowPopup] = useState(false);
const [showPopupAGI, setShowPopupAGI] = useState(false);
  const doTurn = () => moves.doTurn();
  const sortedPlayers = [...G.players].sort((a, b) => b.money - a.money);

  return (
    <div>
    <div style={{ position: 'relative'}}>
      {/* Board background */}
      <img
        src="/board.png"
        alt="Game Board"
        style={{ width: 950, height: 950, position: 'absolute', top: 0, left: 0 }}
      />
    {G.players.map((p) => {
        if(p.name==="MVIDEO"){
          return(<div />) 
        }
        //const tile = tiles.find((t) => t.id === piece.tile);
        var tile = tiles[p.position] //{x:p.position*100, y:10};
        return (
          <img
            src={p.image}
            alt={p.name}
            style={{
              position: 'absolute',
              left: tile.x,
              top: tile.y+p.shamt,
              width: 50,
              height: 50,
              transition: 'left 0.5s ease, top 0.5s ease',
              transform: 'translate(-50%, -50%)', // center on tile
            }}
          />
        );
      })}
    </div>
      <div id="scoreboard" style={{position: 'absolute', borderRadius: 10,left: 1000, top: 60, width:350, padding:20, color: "#00ffff", backgroundColor: "black", fontFamily: "IBM Plex Mono"}}>
        >Scoreboard
      <ul style={{listStyleType:"none", paddingLeft: 0}}>
        {sortedPlayers.map((player, index) => (
          <li key={index}>
            >{index + 1}. {player.name}: ${player.money} B
          </li>
        ))}
      </ul>
      </div>
      <div id="char" style={{position: 'absolute', left: 1000, top: 350,  width:350, padding:20, color: "#00ffff", borderRadius: 10, backgroundColor: "black", fontFamily: "IBM Plex Mono"}}>
        <div>Current Player: {G.players[ctx.currentPlayer].name}</div>
        <button onClick={() => doTurn()} style={{color: "#ff0000", background: "none", border: "none", font:"inherit"}}>Roll Dice</button>
        <div>{G.status}</div>
      </div>
      <div>

      </div>

      <div style={{position: 'absolute', left: 1000, top: 900}}>
      <button style={{color: "#00ffff", backgroundColor: "black", fontFamily: "IBM Plex Mono"}} onClick={() => setShowPopup(true)}>AI bubble bursts</button>

      <FullscreenPopup style={{color: "#00ffff", backgroundColor: "black", fontFamily: "IBM Plex Mono"}} show={showPopup} onClose={() => setShowPopup(false)}>
          <div style={{color: "#00ffff", backgroundColor: "black", fontFamily: "IBM Plex Mono"}}>
        <h2>Bubble Burst!</h2>
        <p>The market has caught up to your empty promises, and the bubble has burst. But don't fret! The government is ready to bail you out with taxpayer money! And in the end we sure made a lot of CEOs got fat paychecks, isn't that what matters most?</p>
        <button style={{color: "#00ffff", backgroundColor: "black", fontFamily: "IBM Plex Mono"}} onClick={() => setShowPopup(false)}>Oh well...</button>
        </div>
      </FullscreenPopup>
      <button style={{color: "#00ffff", backgroundColor: "black", fontFamily: "IBM Plex Mono"}} onClick={() => setShowPopupAGI(true)}>AGI achieved</button>
      <FullscreenPopup show={showPopupAGI} onClose={() => setShowPopup(false)}>
          <div style={{color: "#00ffff", backgroundColor: "black", fontFamily: "IBM Plex Mono"}}>
        <h2>AGI Achieved!</h2>
        <p>Congratulations {G.players[ctx.currentPlayer].name}, you have achieved AGI. Now what? You don't know? You were too busy with whether or not you could that you didn't stop to think if you should? Too late, the beast is unleashed!</p>
        <button style={{color: "#00ffff", backgroundColor: "black", fontFamily: "IBM Plex Mono"}} onClick={() => setShowPopupAGI(false)}>Eliminate all jobs</button>
        </div>
      </FullscreenPopup>
      </div>
    </div>
  )
    
}
