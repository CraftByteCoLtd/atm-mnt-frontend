import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TresuryEditComponent } from './tresury-edit.component';

describe('TresuryEditComponent', () => {
  let component: TresuryEditComponent;
  let fixture: ComponentFixture<TresuryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TresuryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TresuryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
