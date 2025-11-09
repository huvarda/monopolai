import React from 'react';


export function Board({ ctx, G, moves }) {
  return (
    <div style={{ position: 'relative'}}>
      {/* Board background */}
      <img
        src="/background.jpg"
        alt="Game Board"
        style={{ width: 950, height: 950, position: 'absolute', top: 0, left: 0 }}
      />
    {G.players.map((p) => {
        //const tile = tiles.find((t) => t.id === piece.tile);
        var tile = {x:p.position*100, y:10};
        return (
          <img
            src={"/boobs.png"}
            alt={p.name}
            style={{
              position: 'absolute',
              left: tile.x,
              top: tile.y,
              transform: 'translate(-50%, -50%)', // center on tile
            }}
          />
        );
      })}
    </div>
  )
    
}
