import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BoardComponent } from './board.component';
import { Player } from '../player/player.model';
import { NewGameBtnComponent } from '../new-game-btn/new-game-btn.component';

@Component({selector: 'app-board-status-bar', template: ''})
class BoardStatusBarStubComponent { }

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent, BoardStatusBarStubComponent, NewGameBtnComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    component.player1 = new Player('player 1', 0, 'faTimes', 'primary', 'assets/011-game-controller-1.svg');
    component.player2 = new Player('player 2', 0, 'faCircle', 'secondary', 'assets/010-gamepad-2.svg');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validating win\'s scenarios', () => {
    describe('Rows wins', () => {
      it('First row win', () => {
        component.squares = [
          component.player1, component.player1, component.player1, // first row
          null, null, null, // second row
          null, null, null, // third row
        ];
        fixture.detectChanges();
        expect(component.isWin()).toBeTruthy();
      });

      it('Second row win', () => {
        component.squares = [
          null, null, null, // first row
          component.player1, component.player1, component.player1, // second row
          null, null, null, // third row
        ];
        fixture.detectChanges();
        expect(component.isWin()).toBeTruthy();
      });

      it('Third row win', () => {
        component.squares = [
          null, null, null, // first row
          null, null, null, // second row
          component.player1, component.player1, component.player1, // third row
        ];
        fixture.detectChanges();
        expect(component.isWin()).toBeTruthy();
      });
    });

    describe('Columns wins', () => {
      it('First column win', () => {
        component.squares = [
          component.player1, null, null, // first row
          component.player1, null, null, // second row
          component.player1, null, null, // third row
        ];
        fixture.detectChanges();
        expect(component.isWin()).toBeTruthy();
      });

      it('Second column win', () => {
        component.squares = [
          null, component.player1, null, // first row
          null, component.player1, null, // second row
          null, component.player1, null, // third row
        ];
        fixture.detectChanges();
        expect(component.isWin()).toBeTruthy();
      });

      it('Third column win', () => {
        component.squares = [
          null, null, component.player1, // first row
          null, null, component.player1, // second row
          null, null, component.player1, // third row
        ];
        fixture.detectChanges();
        expect(component.isWin()).toBeTruthy();
      });
    });

    describe('Diagonal wins', () => {
      it('First diagonal win', () => {
        component.squares = [
          component.player1, null, null, // first row
          null, component.player1, null, // second row
          null, null, component.player1, // third row
        ];
        fixture.detectChanges();
        expect(component.isWin()).toBeTruthy();
      });

      it('Second diagonal win', () => {
        component.squares = [
          null, null, component.player1, // first row
          null, component.player1, null, // second row
          component.player1, null, null, // third row
        ];
        fixture.detectChanges();
        expect(component.isWin()).toBeTruthy();
      });
    });
  });

  describe('When the game starts', () => {

    it('should have 9 app-cells being displayed', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelectorAll('app-cell').length).toBe(9);
    });

    it('should have no winner', () => {
      expect(component.winner).toBeNull();
    });

    it('should have no app-new-game-btn button being displayed', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('app-new-game-btn')).toBeNull();
    });

    it('should call `sortTurn` method to define which player start', () => {
      spyOn(component, 'sortTurn');
      component.startNewGame();
      fixture.detectChanges();
      expect(component.sortTurn).toHaveBeenCalled();
    });

    it('should call `updateSign` method when `sortTurn` method is called', () => {
      spyOn(component, 'updateSign');
      component.sortTurn();
      fixture.detectChanges();
      expect(component.updateSign).toHaveBeenCalled();
    });

    it('should set `x` sign to player1 and `o` to player2 when is player 1 is sorted to start', () => {
      component.updateSign(true);
      fixture.detectChanges();
      expect(component.player1.sign).toBe('faTimes');
      expect(component.player2.sign).toBe('faCircle');
    });

    it('should set `o` sign to player1 and `x` to player2 when is player 2 is sorted to start', () => {
      component.updateSign(false);
      fixture.detectChanges();
      expect(component.player1.sign).toBe('faCircle');
      expect(component.player2.sign).toBe('faTimes');
    });

  });

  describe('When the game is ended', () => {
    it('should display the new game button', () => {
      // end game example state
      component.squares = [
        component.player1, component.player1, component.player2, // first row
        component.player2, component.player2, component.player1, // second row
        component.player1, component.player1, null, // third row
      ];
      let compiled = fixture.nativeElement;
      // clicks on the last option
      const winOption = compiled.querySelectorAll('app-cell')[8];
      winOption.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      compiled = fixture.nativeElement;
      expect(compiled.querySelector('app-new-game-btn')).not.toBeNull();
    });

    it('should call `startNewGame` method when receive `startNewGame` event is triggered', () => {
      component.showNewGameBtn = true;
      fixture.detectChanges();
      spyOn(component, 'startNewGame');
      const newGameBtn = fixture.debugElement.query(By.directive(NewGameBtnComponent));
      const cmp = newGameBtn.componentInstance;
      cmp.startNewGame.emit();
      fixture.detectChanges();
      expect(component.startNewGame).toHaveBeenCalled();
    });

    describe('and there is no winner', () => {
      beforeEach(() => {
        // no winner example state
        component.squares = [
          component.player1, component.player1, component.player2, // first row
          component.player2, component.player2, component.player1, // second row
          component.player1, component.player1, component.player2, // third row
        ];
        fixture.detectChanges();
      });

      it('should `isWin` return false', () => {
        expect(component.isWin()).toBeFalsy();
      });

      it('should `isGameEnded` return true', () => {
        expect(component.isGameEnded()).toBeTruthy();
      });

      it('should display a no winner message', () => {
        expect(component.gameStatusMessage()).toContain('Ooops! The game has no winner :(');
      });
    });

    describe('and it is a player 1 win', () => {
      let compiled;
      beforeEach(() => {
        // player 1 win example state
        component.squares = [
          component.player1, component.player1, null, // first row
          component.player2, component.player2, null, // second row
          null, null, null // third row
        ];
        // is player 1 turn
        component.isPlayer1Turn = true;
        compiled = fixture.nativeElement;
        // and it clicks on the win option
        const winOption = compiled.querySelectorAll('app-cell')[2];
        winOption.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        compiled = fixture.nativeElement;
      });

      it('should `isWin` return true', () => {
        expect(component.isWin()).toBeTruthy();
      });

      it('should `isGameEnded` return false', () => {
        expect(component.isGameEnded()).toBeFalsy();
      });

      it('should have the winner info', () => {
        expect(component.winner).not.toBeNull();
      });

      it('should add one win to the player 1 info', () => {
        expect(component.player1.wins).toBe(1);
      });

      it('should display a winner win message', () => {
        expect(component.gameStatusMessage()).toContain(`Well done ${component.winner.name}! You are the winner!`);
      });
    });

    describe('and it is a player 2 win', () => {
      let compiled;
      beforeEach(() => {
        // player 1 win example state
        component.squares = [
          component.player1, component.player1, null, // first row
          component.player2, component.player2, null, // second row
          null, null, null // third row
        ];
        // is player 2 turn
        component.isPlayer1Turn = false;
        compiled = fixture.nativeElement;
        // and it clicks on the win option
        const winOption = compiled.querySelectorAll('app-cell')[5];
        winOption.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        compiled = fixture.nativeElement;
      });

      it('should `isWin` return true', () => {
        expect(component.isWin()).toBeTruthy();
      });

      it('should `isGameEnded` return false', () => {
        expect(component.isGameEnded()).toBeFalsy();
      });

      it('should have the winner info', () => {
        expect(component.winner).not.toBeNull();
      });

      it('should add one win to the player 2 info', () => {
        expect(component.player2.wins).toBe(1);
      });

      it('should display a winner win message', () => {
        expect(component.gameStatusMessage()).toContain(`Well done ${component.winner.name}! You are the winner!`);
      });
    });
  });
});
