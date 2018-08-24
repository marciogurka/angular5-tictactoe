import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player/player.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() player1: Player;
  @Input() player2: Player;
  winner: Player;
  showNewGameBtn: boolean;
  isPlayer1Turn: boolean;
  squares = Array(9).fill(null);

  constructor() {
  }

  ngOnInit() {
    this.startNewGame();
  }

  sortTurn() {
    this.isPlayer1Turn = Math.round(Math.random()) === 0;
    this.updateSign(this.isPlayer1Turn);
  }

  checkGame(position) {
    const player = this.isPlayer1Turn ? this.player1 : this.player2;
    if (!this.winner && this.squares[position] === null) {
      this.squares[position] = player;
      if (this.isWin()) {
        player.addWin();
        this.winner = player;
        this.showNewGameBtn = true;
      } else if (this.isGameEnded()) {
        this.showNewGameBtn = true;
      }
      this.isPlayer1Turn = !this.isPlayer1Turn;
    }
  }

  startNewGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.showNewGameBtn = false;
    this.sortTurn(); // 0 or 1 to sort turn
  }

  updateSign(isPlayer1Turn: boolean) {
    if (this.player1 && this.player1) {
      if (isPlayer1Turn) {
        this.player1.setSign('faTimes');
        this.player2.setSign('faCircle');
      } else {
        this.player1.setSign('faCircle');
        this.player2.setSign('faTimes');
      }
    }
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
      return `Player ${(this.isPlayer1Turn) ? this.player1.name : this.player2.name}'s turn`;
    }
  }

}
