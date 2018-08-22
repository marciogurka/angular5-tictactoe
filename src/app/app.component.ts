import { Component, ViewEncapsulation } from '@angular/core';
import { faCode, faHeart } from '@fortawesome/free-solid-svg-icons';
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
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('500ms', style({transform: 'translateY(100%)', 'opacity': 0}),
        ]
      )]
    )
  ]
})

export class AppComponent {
  title = 'Angular 5 tic-tac-toe';
  faCode = faCode;
  faHeart = faHeart;

  // check if the board is going to be displayed
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
