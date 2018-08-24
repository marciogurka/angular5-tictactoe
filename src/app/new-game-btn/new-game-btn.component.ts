import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-game-btn',
  templateUrl: './new-game-btn.component.html',
  styleUrls: ['./new-game-btn.component.css']
})

/**
 * NewGameBtnComponent class
 */
export class NewGameBtnComponent {

  /**
   * Event emmited when the user request a new game
   */
  @Output() startNewGame: EventEmitter<string> = new EventEmitter();

  /**
   * Emits the `startNewGame` event
   *
   * @returns {}
   */
  onStartNewGame() {
    this.startNewGame.emit();
  }

}
