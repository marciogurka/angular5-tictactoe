import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-board-status-bar',
  templateUrl: './board-status-bar.component.html',
  styleUrls: ['./board-status-bar.component.css']
})
export class BoardStatusBarComponent {
  @Input() statusMessage: string;
}
