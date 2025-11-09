import React, { useState } from "react";
import { Client } from "boardgame.io/react";
import { Monopoly } from "./Game";
import "./App.css";

const BGClient = Client({ game: Monopoly, numPlayers:4 });

export default function App() {
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

  const moveBackground = () => {
    setBgPosition(prev => ({
      x: prev.x + 10,
      y: prev.y + 5
    }));
  };

  return (
    <div
      className="game-container"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      {/* Render your boardgame.io game inside */}
      <div className="board-area">
        <BGClient />
      </div>
    </div>
  );
}
