import { INVALID_MOVE } from 'boardgame.io/core';

function generateBoard() {
  return [
    { name: 'Start', type: 'start', amount: 20},
    { name: 'Auckland', type: 'plot', price: 20 , cost: 10},
    { name: 'Melbourne', type: 'plot', price: 22 , cost: 20},
    { name: 'Blank', type: 'placeholder'},
    { name: 'Santiago', type: 'plot', price: 30 , cost: 30},
    { name: 'Sao Paulo', type: 'plot', price: 31 , cost: 40},
    { name: '\"Jail\"', type: 'placeholder'},
    { name: 'Abu Dhabi', type: 'plot', price: 37 , cost: 50},
    { name: 'Dubai', type: 'plot', price: 39 , cost: 60},
    { name: 'New York City', type: 'plot', price: 42 , cost: 70},
    { name: 'Blank', type: 'placeholder'},
    { name: 'Silicon Valley', type: 'plot', price: 46 , cost: 80},
    { name: 'MVIDEO Investment', type: 'mvideo' },
    { name: 'Ashburn', type: 'plot', price: 51 , cost: 90},
    { name: 'Blank', type: 'placeholder'},
    { name: 'Dallas', type: 'plot', price: 55 , cost: 100},
    { name: 'Beijing', type: 'plot', price: 60 , cost: 110},
    { name: 'Tokyo', type: 'plot', price: 62 , cost: 120},
    { name: 'Go to Jail', type: 'to_jail'},
    { name: 'South Africa', type: 'plot', price: 67 , cost: 130},
    { name: 'Casablanca', type: 'plot', price: 70 , cost: 140},
    { name: 'London', type: 'plot', price: 78 , cost: 150},
    { name: 'Blank', type: 'placeholder'},
    { name: 'Frankfurt', type: 'plot', price: 82 , cost: 160},
  ];
}

export const Monopoly = {

  setup: () => ({
    choice: null,
    players: [
      { name: "ClosedAI", position: 0, money: 150, owned_property:[], image:"/ClosedAI.webp", shamt:-20},
      { name: "Epistem", position: 0, money: 150, owned_property:[], image:"/Epistem.webp", shamt: -10},
      { name: "Amethyst", position: 0, money: 150, owned_property:[], image:"/Amethyst.webp", shamt: 0},
      { name: "Macrosoft", position: 0, money: 150, owned_property:[], image:"/Macrosoft.webp", shamt: 10},
      { name: "MVIDEO", position: 0, money: 200, owned_property:[], image:"/Macrosoft.webp", shamt: 30},
    ],
    dice: null,
    board: generateBoard(),
    status: null,
  }),
  
  turn: {
    onBegin: (G, ctx) => {G.choice = null},
    minMoves: 1,
    maxMoves: 1,
  },
  
  moves: {
    doTurn({G, playerID}, ctx) {
      G.status = ""
      const roll = Math.ceil(Math.random() * 6);
      G.dice = roll;

      G.players[4].money += Math.ceil(Math.random() * 40);

      console.log(playerID);
      const player = G.players[playerID];
      console.log(player);
      var prevpos = player.position;
      player.position = (player.position + G.dice) % G.board.length;
      const square = G.board[player.position];

      if (player.position < prevpos) {//we know we passed or landed on go
        player.money += 5;
        G.status += (player.name+" has passed go and gained 5B dollars!\n\n");
      }
      if (square.type === 'plot' && !square.owner) {

        if (player.money >= square.price) {
          G.status += (player.name+" has purchased "+square.name+ "\n");
          player.money -= square.price;
          square.owner = playerID;
          player.owned_property.push(square.name);
        }
        else {
          G.status += (player.name+" cannot afford "+square.name+ "\n");
        }
      }

      else if (square.type === 'plot' && square.owner !== player.name) {
        var cost = square.cost;
        if (square.hasDataCenter) {
          cost *= 2;
        }
        player.money -= cost;
        G.players[square.owner].money += cost;

        G.status += (player.name+" has paid "+G.players[square.owner].name+" " +cost+"B $\n");

      }

      else if (square.type === "to_jail") {
        G.status += (player.name+" was caught using copyrighted data in\n training! But nothing happened.\n");
      }
      
      else if (square.type === "mvideo") {
        G.status += (player.name+" has received an investment from MVIDEO for 20B$\n");
        player.money += 20;
      }

    },

  },

};

