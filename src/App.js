import React, { useState } from "react";
import { Client } from "boardgame.io/react";
import { Board } from "./Board"
import { Monopoly } from "./Game";
import "./App.css";

const BGClient = Client({ game: Monopoly, numPlayers:4 , board:Board});

export default function App() {

  return (
    <div>
        <BGClient />
    </div>
  );
}
