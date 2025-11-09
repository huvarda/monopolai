import React, { useState } from "react";
import { Client } from "boardgame.io/react";
import { Board } from "./Board"
import { Monopoly } from "./Game";
import "./App.css";

const BGClient = Client({ game: Monopoly, numPlayers:4 , board:Board});

export default function App() {
  const backgroundStyle = {
    width: "100vw",
    height: "100vh",
    backgroundImage: "url('/bg.png')",
    backgroundSize: "cover",        // fills the screen
    backgroundPosition: "center",   // centers the image
    backgroundRepeat: "no-repeat",  // prevents tiling
  };
  return (
    <div style={backgroundStyle}>
      <BGClient />
    </div>
  );
}
