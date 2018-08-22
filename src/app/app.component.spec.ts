import { TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';

@Component({selector: 'app-player', template: ''})
class PlayerStubComponent { }

@Component({selector: 'app-board', template: ''})
class BoardStubComponent { }

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PlayerComponent,
        BoardStubComponent
      ],
      imports: [
        FontAwesomeModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have a title with 'Angular 5 tic-tac-toe'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular 5 tic-tac-toe');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('Angular 5 tic-tac-toe');
  }));
  it(`should have two app-player components`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('app-player').length).toEqual(2);
  }));
  it('should render a link to the repo', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.nav-link').getAttribute('href')).toContain('https://github.com/marciogurka/angular5-tictactoe');
  }));
  it('should call `playerSubmitted` method when `playerSubmitted` event is triggered', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    spyOn(app, 'playerSubmitted');
    const counter = fixture.debugElement.query(By.directive(PlayerComponent));
    const cmp = counter.componentInstance;
    cmp.playerSubmitted.emit();
    fixture.detectChanges();
    expect(app.playerSubmitted).toHaveBeenCalled();
  }));

  describe('When one player is ready', () => {
    let fixture, component, compiled;
    beforeEach(async(() => {
        // create component and test fixture
       fixture = TestBed.createComponent(AppComponent);

       // get test component from the fixture
       component = fixture.componentInstance;
       component.players[0].isReady = true;
       component.playerSubmitted();
    }));
    it('should not have a board being displayed', async(() => {
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('app-board').length).toEqual(0);
    }));

    it('should have `gameStart` set to false', async(() => {
      fixture.detectChanges();
      component = fixture.debugElement.componentInstance;
      expect(component.gameReady).toEqual(false);
    }));
  });

  describe('When both players are ready', () => {
    let fixture, component, compiled;
    beforeEach(async(() => {
      // create component and test fixture
       fixture = TestBed.createComponent(AppComponent);

       // get test component from the fixture
       component = fixture.componentInstance;
       component.players[0].isReady = true;
       component.players[1].isReady = true;
       component.playerSubmitted();
    }));
    it('should have a board being displayed', async(() => {
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('app-board').length).toEqual(1);
    }));

    it('should have `gameStart` set to true', async(() => {
      fixture.detectChanges();
      component = fixture.debugElement.componentInstance;
      expect(component.gameReady).toEqual(true);
    }));
  });
});
