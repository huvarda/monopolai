import React from 'react';

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
  const sortedPlayers = [...G.players].sort((a, b) => b.money - a.money);

  return (
    <div>
    <div style={{ position: 'relative'}}>
      {/* Board background */}
      <img
        src="/background.jpg"
        alt="Game Board"
        style={{ width: 950, height: 950, position: 'absolute', top: 0, left: 0 }}
      />
    {G.players.map((p) => {
        if(p.name==="MVIDEO"){
          return(<div />) 
        }
        //const tile = tiles.find((t) => t.id === piece.tile);
        var tile = tiles[p.position] //{x:p.position*100, y:10};
        console.log(p.image);
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
      <div id="scoreboard" style={{position: 'absolute', left: 1000, top: 60}}>
        <h2>Scoreboard</h2>
      <ul>
        {sortedPlayers.map((player, index) => (
          <li key={index}>
            {index + 1}. {player.name} - ${player.money}
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
    
}
