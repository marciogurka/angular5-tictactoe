import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from './player.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

/**
 * Player Component class
 */
export class PlayerComponent implements OnInit {

  /**
   * Event emmited when the user is ready
   */
  @Output() playerSubmitted: EventEmitter<string> = new EventEmitter();

  /**
   * Player Class
   */
  @Input() player: Player;

  /**
   * Inform if the game is ready or not
   */
  @Input() gameReady: boolean;

  /**
   * Form of the Player info
   */
  playerForm: FormGroup;

  /**
   * Update the player `isReady` property and emit the `playerSubmitted` event
   *
   * @returns {}
   */
  onPlayerSubmit() {
    if (this.playerForm.valid) {
      this.player.isReady = true;
      this.playerSubmitted.emit();
    }
  }

  constructor(private fb: FormBuilder) {
  }

  /**
   * Initialize the form properly
   *
   * @returns {}
   */
  ngOnInit() {
    this.playerForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
      wins: [0, []],
    });
  }
}
