import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BoardStatusBarComponent } from './board-status-bar.component';

@Component({
  selector: `test-host-component`,
  template: `<app-board-status-bar [statusMessage]="message"></app-board-status-bar>`
})
class TestHostComponent {
  @ViewChild(BoardStatusBarComponent)
  public boardStatusBarComponent: BoardStatusBarComponent;
}

describe('BoardStatusBarComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardStatusBarComponent,
        TestHostComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  }));

  it('should create', () => {
    expect(testHostComponent.boardStatusBarComponent).toBeTruthy();
  });

  it('should show `test message`', () => {
    testHostComponent.boardStatusBarComponent.statusMessage = 'test message';
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('.text-muted').innerText).toEqual('test message');
  });

  it('should show `another test message`', () => {
    testHostComponent.boardStatusBarComponent.statusMessage = 'another test message';
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('.text-muted').innerText).toEqual('another test message');
  });
});
