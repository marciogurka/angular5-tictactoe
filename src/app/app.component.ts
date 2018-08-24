import { Component, ViewEncapsulation } from '@angular/core';
import { faCode, faHeart, faBook } from '@fortawesome/free-solid-svg-icons';
import { Player } from './player/player.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger(
      'animateBoardIn',
      [
        transition(
        ':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', 'opacity': 1}))
        ]
      )]
    )
  ]
})

/**
 * The App Component Class
 */
export class AppComponent {
  /**
   *   Title of the application
   */
  title = 'Angular 5 tic-tac-toe';
  /**
   *   Code Icon
   */
  faCode = faCode;
  /**
   *   Heart Icon
   */
  faHeart = faHeart;
  /**
   *   Book Icon
   */
  faBook = faBook;
  /**
   *   Array of players
   */
  players: Array<Player>;
  /**
   *   Inform if the game is ready or not
   */
  gameReady: boolean;

  /**
   * Listener to the `playerSubmitted` event and if both players are ready to set the `gameReady` property to true/false
   *
   * @returns {}
   */

  playerSubmitted() {
    const readyPlayers = this.players.filter((player: Player) => player.isReady);
    if (readyPlayers.length === 2) {
      this.gameReady = true;
    } else {
      this.gameReady = false;
    }
  }

  constructor() {
    const player1 = new Player('', 0, 'faTimes', 'primary', 'assets/011-game-controller-1.svg');
    const player2 = new Player('', 0, 'faCircle', 'secondary', 'assets/010-gamepad-2.svg');
    this.players = [player1, player2];
    this.gameReady = false;
  }
}
