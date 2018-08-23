import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-game-btn',
  templateUrl: './new-game-btn.component.html',
  styleUrls: ['./new-game-btn.component.css']
})
export class NewGameBtnComponent {
  @Output() startNewGame: EventEmitter<string> = new EventEmitter();

  onStartNewGame() {
    this.startNewGame.emit();
  }

}
