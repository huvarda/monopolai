import { Client } from 'boardgame.io/client';
import { Monopoly } from './Game';

class TicTacToeClient {
  constructor() {
    this.client = Client({ game: Monopoly });
    this.client.start();
  }
}

const app = new TicTacToeClient();
