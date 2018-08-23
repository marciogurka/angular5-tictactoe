import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CellComponent } from './cell.component';
import { Player } from '../player/player.model';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellComponent ],
      imports: [
        FontAwesomeModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When the game starts', () => {
    it('should have no icon', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('span')).toBeNull();
    });
  });

  describe('When its player 1 turn', () => {
    beforeEach(() => {
      component.state = new Player('', 0, 'faTimes', 'primary', 'assets/011-game-controller-1.svg');
      fixture.detectChanges();
    });

    it('should have `btn-outline-primary` class', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.btn-outline-primary')).not.toBeNull();
    });

    describe('and is selected by the player', () => {
      it('should have `fa-times` icon being displayed', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.fa-times')).not.toBeNull();
      });
    });
  });

  describe('When its player 2 turn', () => {
    beforeEach(() => {
      component.state = new Player('', 0, 'faCircle', 'secondary', 'assets/010-gamepad-2.svg');
      fixture.detectChanges();
    });

    it('should have `btn-outline-secondary` class', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.btn-outline-secondary')).not.toBeNull();
    });

    describe('and is selected by the player', () => {
      it('should have `fa-circle-notch` icon being displayed', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.fa-circle-notch')).not.toBeNull();
      });
    });
  });
});
