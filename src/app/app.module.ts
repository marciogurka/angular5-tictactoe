import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { NewGameBtnComponent } from './new-game-btn/new-game-btn.component';
import { BoardStatusBarComponent } from './board-status-bar/board-status-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    BoardComponent,
    CellComponent,
    NewGameBtnComponent,
    BoardStatusBarComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
