import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from './player.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Output() playerSubmitted: EventEmitter<string> = new EventEmitter();
  @Input() player: Player;
  @Input() gameReady: boolean;
  playerForm: FormGroup;

  onPlayerSubmit() {
    if (this.playerForm.valid) {
      this.player.isReady = true;
      this.playerSubmitted.emit();
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.playerForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
      wins: [0, []],
    });
  }
}
