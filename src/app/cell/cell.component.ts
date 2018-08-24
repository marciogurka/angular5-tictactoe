import { Component, OnInit, Input } from '@angular/core';
import { faTimes, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Player } from '../player/player.model';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})

/**
 * CellComponent class
 */
export class CellComponent {
  /**
   * Player that selected the cell
   */
  @Input() state: Player;

  /**
   * faTimes icon
   */
  faTimes = faTimes;

  /**
   * faCircleNotch icon
   */
  faCircleNotch = faCircleNotch;

  constructor() {
    this.state = null;
  }

}
