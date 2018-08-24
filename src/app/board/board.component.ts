import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player/player.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

/**
 * BoardComponent class
 */
export class BoardComponent implements OnInit {

  /**
   * Player 1 info
   */
  @Input() player1: Player;

  /**
   * Player 2 info
   */
  @Input() player2: Player;

  /**
   * Winner info
   */
  winner: Player;

  /**
   * Inform if NewGameBtnComponent should be rendered or not
   */
  showNewGameBtn: boolean;

  /**
   * Inform if its player 1 turn or not
   */
  isPlayer1Turn: boolean;

  /**
   * Array of states to inform which player selected a determined cell
   */
  squares = Array(9).fill(null);

  constructor() {
  }

  /**
   * Start a new game with correct info
   *
   * @returns {}
   */
  ngOnInit() {
    this.startNewGame();
  }

  /**
   * Sort randomly if it's a player 1's turn or not,
   * then update the sign of the players
   *
   * @returns {}
   */
  sortTurn() {
    this.isPlayer1Turn = Math.round(Math.random()) === 0;
    this.updateSign(this.isPlayer1Turn);
  }

  /**
   * Check if the game is a valid selection,
   * then if it's a player win and if the game is ended,
   * if not ended, change player's turn
   *
   * @param  {number} position - position of the board that will be checked
   * @returns {}
   */
  checkGame(position: number) {
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

  /**
   * Set the values of a new game status,
   * then sort which player will start the game
   *
   * @returns {}
   */
  startNewGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.showNewGameBtn = false;
    this.sortTurn(); // 0 or 1 to sort turn
  }

  /**
   * Update the sign of the player after sorting which one will start the game
   *
   * @param  {boolean} isPlayer1Turn - Inform if the player 1 will start the game or not
   * @returns {}
   */
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

  /**
   * Check if all the cells were selected
   *
   * @returns {boolean}  Inform if all the cells were selected
   */
  isGameEnded() {
    return this.squares.filter((square) => square === null).length === 0;
  }

  /**
   * Check all the win's scenarios and return if it's a win state or none
   *
   * @returns {boolean}  Inform if it's a win state or not
   */
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

  /**
   * Check if the game is ended and if has a winner, if none are true,
   * shows which player's turn is
   *
   * @returns {string}  The message to be displayed in the BoardStatusBar Component
   */
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
