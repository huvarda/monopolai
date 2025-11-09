import { INVALID_MOVE } from 'boardgame.io/core';

function generateBoard() {
  return [
    { name: 'Start', type: 'start', amount: 200},
    { name: 'A1', type: 'plot', price: 100 , cost: 100},
    { name: 'A2', type: 'plot', price: 120 , cost: 200},
    { name: 'Blank', type: 'placeholder'},
    { name: 'B1', type: 'plot', price: 200 , cost: 300},
    { name: 'B2', type: 'plot', price: 210 , cost: 400},
    { name: '\"Jail\"', type: 'placeholder'},
    { name: 'C1', type: 'plot', price: 270 , cost: 500},
    { name: 'C2', type: 'plot', price: 290 , cost: 600},
    { name: 'Chance', type: 'chance' },
    { name: 'D1', type: 'plot', price: 320 , cost: 700},
    { name: 'D2', type: 'plot', price: 360 , cost: 800},
    { name: 'MVIDEO Investment', type: 'mvideo' },
    { name: 'E1', type: 'plot', price: 410 , cost: 900},
    { name: 'E2', type: 'plot', price: 450 , cost: 1000},
    { name: 'Chance', type: 'chance' },
    { name: 'F1', type: 'plot', price: 500 , cost: 1100},
    { name: 'F2', type: 'plot', price: 520 , cost: 1200},
    { name: 'Go to Jail', type: 'to_jail'},
    { name: 'G1', type: 'plot', price: 570 , cost: 1300},
    { name: 'G2', type: 'plot', price: 600 , cost: 1400},
    { name: 'Blank', type: 'placeholder'},
    { name: 'H1', type: 'plot', price: 700 , cost: 1500},
    { name: 'H2', type: 'plot', price: 800 , cost: 1600},
  ];
}

export const Monopoly = {

  setup: () => ({
    choice: null,
    players: [
      { name: "ClosedAI", position: 0, money: 1500, owned_property:[], image:"/ClosedAI.webp", shamt:0},
      { name: "Epistem", position: 0, money: 1500, owned_property:[], image:"/Epistem.webp", shamt: 10},
      { name: "Amethyst", position: 0, money: 1500, owned_property:[], image:"/Amethyst.webp", shamt: 20},
      { name: "Macrosoft", position: 0, money: 1500, owned_property:[], image:"/Macrosoft.webp", shamt: 30},
      { name: "MVIDEO", position: 0, money: 5000, owned_property:[], image:"/Macrosoft.webp", shamt: 30},
    ],
    dice: null,
    board: generateBoard(),
  }),
  
  turn: {
    onBegin: (G, ctx) => {G.choice = null},
    minMoves: 1,
    maxMoves: 1,
  },
  
  moves: {
    doTurn({G, playerID}, ctx) {
      const roll = Math.ceil(Math.random() * 6);
      G.dice = roll;

      G.players[4].money += Math.ceil(Math.random() * 300);

      console.log(playerID);
      const player = G.players[playerID];
      console.log(player);
      var prevpos = player.position;
      player.position = (player.position + G.dice) % G.board.length;
      const square = G.board[player.position];

      if (player.position < prevpos) {//we know we passed or landed on go
        player.money += 200;
      }
      if (square.type === 'plot' && !square.owner) {
        if (player.money >= square.price) {
          player.money -= square.price;
          square.owner = playerID;
          player.owned_property.push(square.name);
        }
      }

      else if (square.type === 'plot' && square.owner !== player.name) {
        var cost = square.cost;
        if (square.hasDataCenter) {
          cost *= 2;
        }
        player.money -= cost;
        G.players[square.owner].money += cost;

      }

      else if (square.type === "to_jail") {
        player.position = 6;
      }
      
      else if (square.type === "mvideo") {
        player.money += 500;
      }
        // TODO

    },

  },

};

