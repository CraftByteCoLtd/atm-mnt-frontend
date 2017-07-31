import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TresuryComponent } from './tresury.component';

describe('TresuryComponent', () => {
  let component: TresuryComponent;
  let fixture: ComponentFixture<TresuryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TresuryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TresuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
