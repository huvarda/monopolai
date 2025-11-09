import React, { useState } from "react";
import { Client } from "boardgame.io/react";
import { TicTacToe } from "./Game";
import "./App.css";

// ✅ Create your boardgame.io client component
const BGClient = Client({ game: TicTacToe });

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
      {/* Example sidebar */}
      <div className="sidebar">
        <h2>Game Controls</h2>
        <button onClick={moveBackground}>Move Background</button>
        {/* You can add other control buttons here */}
      </div>

      {/* Render your boardgame.io game inside */}
      <div className="board-area">
        <BGClient />
      </div>
    </div>
  );
}
