import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmEditComponent } from './atm-edit.component';

describe('AtmEditComponent', () => {
  let component: AtmEditComponent;
  let fixture: ComponentFixture<AtmEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
