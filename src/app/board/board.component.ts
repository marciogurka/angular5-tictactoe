import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player/player.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() player1: Player;
  @Input() player2: Player;
  winner: Player;
  showNewGameBtn: boolean;
  player1Turn: boolean;
  squares = Array(9).fill(null);

  constructor() {
    this.startNewGame();
  }

  sortTurn() {
    return Math.round(Math.random()) === 0;
  }

  checkGame(position) {
    const player = this.player1Turn ? this.player1 : this.player2;
    if (!this.winner && this.squares[position] === null) {
      this.squares[position] = player;
      if (this.isWin()) {
        player.addWin();
        this.winner = player;
        this.showNewGameBtn = true;
      } else if (this.isGameEnded()) {
        this.showNewGameBtn = true;
      }
      this.player1Turn = !this.player1Turn;
    }
  }

  startNewGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.showNewGameBtn = false;
    this.player1Turn = this.sortTurn(); // 0 or 1 to sort turn
  }

  isGameEnded() {
    return this.squares.filter((square) => square === null).length === 0;
  }

  isWin() {
    const conditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonal
    ];
    for (const condition of conditions) {
        if (this.squares[condition[0]]
            && this.squares[condition[0]] === this.squares[condition[1]]
            && this.squares[condition[1]] === this.squares[condition[2]]) {
              return true;
        }
    }
    return false;
  }

  gameStatusMessage() {
    if (this.isGameEnded() && !this.winner) {
      return `Ooops! The game has no winner :(`;
    } else if (this.winner) {
      return `Well done ${this.winner.name}! You are the winner!`;
    } else {
      return `Player ${(this.player1Turn) ? this.player1.name : this.player2.name}'s turn`;
    }
  }

}
