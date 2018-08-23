import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PlayerComponent } from './player.component';
import { Player } from './player.model';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    component.player = new Player('', 0, 'faTimes', 'primary', 'assets/011-game-controller-1.svg');
    component.gameReady = false;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Before the game start', () => {
    describe('and the player is not ready', () => {
      it('should have form invalid when empty', () => {
        expect(component.playerForm.valid).toBeFalsy();
      });

      it('should have player name field validity working', () => {
        const name = component.playerForm.controls['name'];
        expect(name.valid).toBeFalsy();
        name.setValue('player');
        expect(name.valid).toBeTruthy();
      });

      it('should have the submit button disabled when the name input is empty', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.submit-btn').getAttribute('disabled')).not.toBeNull();
      });

      it('should have the submit button enabled when the name input is not empty', () => {
        const name = component.playerForm.controls['name'];
        name.setValue('player');
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.submit-btn').getAttribute('disabled')).toBeNull();
      });

      it('should set player ready when `onPlayerSubmit` method is called', () => {
        const name = component.playerForm.controls['name'];
        name.setValue('player');
        component.onPlayerSubmit();
        fixture.detectChanges();
        expect(component.player.isReady).toBeTruthy();
      });

      it('should emit `playerSubmitted` event ready when `onPlayerSubmit` method is called', () => {
        spyOn(component.playerSubmitted, 'emit');
        const name = component.playerForm.controls['name'];
        name.setValue('player');
        component.onPlayerSubmit();
        fixture.detectChanges();
        expect(component.playerSubmitted.emit).toHaveBeenCalled();
      });
    });
    describe('And the player is ready', () => {
      it('should have the name input readonly', () => {
        const name = component.playerForm.controls['name'];
        name.setValue('player');
        component.onPlayerSubmit();
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('input[name="name"]').getAttribute('readonly')).not.toBeNull();
      });

      it('should show an alert with wait for the other player message', () => {
        const name = component.playerForm.controls['name'];
        name.setValue('player');
        component.onPlayerSubmit();
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.alert').innerText).toContain('Waiting for the other player');
      });
    });
  });

  describe('After the game has started', () => {
    it('should not have an alert with wait for the other player message', () => {
      component.gameReady = true;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.alert')).toBeNull();
    });
  });
});
