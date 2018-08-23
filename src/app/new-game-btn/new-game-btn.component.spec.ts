import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewGameBtnComponent } from './new-game-btn.component';

describe('NewGameBtnComponent', () => {
  let component: NewGameBtnComponent;
  let fixture: ComponentFixture<NewGameBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGameBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGameBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger `onStartNewGame` method when the button is clicked', () => {
    spyOn(component, 'onStartNewGame');
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.onStartNewGame).toHaveBeenCalled();
  });

  it('should emit `startNewGame` event when `onStartNewGame` is called', () => {
    spyOn(component.startNewGame, 'emit');
    component.onStartNewGame();
    fixture.detectChanges();
    expect(component.startNewGame.emit).toHaveBeenCalled();
  });
});
