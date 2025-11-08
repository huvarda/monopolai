import { INVALID_MOVE } from 'boardgame.io/core';

function generateBoard() {
  return [
    { name: 'Start', type: 'start' },
    { name: 'A1', type: 'plot', price: 60 },
    { name: 'A2', type: 'plot', price: 60 },
    { name: 'Blank', type: 'placeholder'},
    { name: 'B1', type: 'plot', price: 60 },
    { name: 'B2', type: 'plot', price: 60 },
    { name: '\"Jail\"', type: 'placeholder'},
    { name: 'C1', type: 'plot', price: 60 },
    { name: 'C2', type: 'plot', price: 60 },
    { name: 'Chance', type: 'chance' },
    { name: 'D1', type: 'plot', price: 60 },
    { name: 'D2', type: 'plot', price: 60 },
    { name: 'MVIDEO Investment', type: 'mvideo' },
    { name: 'E1', type: 'plot', price: 60 },
    { name: 'E2', type: 'plot', price: 60 },
    { name: 'Chance', type: 'chance' },
    { name: 'F1', type: 'plot', price: 60 },
    { name: 'F2', type: 'plot', price: 60 },
    { name: 'Go to Jail', type: 'to_jail'},
    { name: 'G1', type: 'plot', price: 60 },
    { name: 'G2', type: 'plot', price: 60 },
    { name: 'Blank', type: 'placeholder'},
    { name: 'H1', type: 'plot', price: 60 },
    { name: 'H2', type: 'plot', price: 60 },
  ];
}

export const Monopoly = {
  setup: () => ({
    players: [
      { name: "ClosedAI", position: 0, money: 1500, owned_property:[]},
      { name: "Epistem", position: 0, money: 1500, owned_property:[]},
      { name: "Amethyst", position: 0, money: 1500, owned_property:[]},
      { name: "Macrosoft", position: 0, money: 1500, owned_property:[]},
    ],
    dice: null,
    board: generateBoard(),
  }),

  moves: {
    rollDice(G, ctx) {
      const roll = Math.ceil(Math.random() * 6);
      G.dice = roll;
    },

    move(G, ctx) {
      const player = G.players[ctx.currentPlayer];
      player.position = (player.position + G.dice) % G.board.length;
      const square = G.board[player.position];
      
      if (square.type === 'tax') {
        player.money -= square.amount;
      }
      if (square.type === 'property' && !square.owner) {
        // optionally buy it
        if (player.money >= square.price) {
          square.owner = ctx.currentPlayer;
          player.money -= square.price;
        }
      }
    },
  },

  turn: {
    stages: {
      roll: {
        moves: { rollDice: true },
        next: 'move',
      },
      move: {
        moves: { move: true },
        next: 'end',
      },  
      end: {
        onBegin(G, ctx) {
          ctx.events.endTurn();
        }
      },
    },
    onBegin(G, ctx) {
      ctx.events.setStage('roll');
    },
  },
  },

};
