import { Component, OnInit, Input } from '@angular/core';
import { faTimes, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Player } from '../player/player.model';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
  @Input() state: Player;
  faTimes = faTimes;
  faCircleNotch = faCircleNotch;

  constructor() {
    this.state = null;
  }

}
