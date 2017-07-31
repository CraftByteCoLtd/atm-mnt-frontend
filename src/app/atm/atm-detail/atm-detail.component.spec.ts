import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmDetailComponent } from './atm-detail.component';

describe('AtmDetailComponent', () => {
  let component: AtmDetailComponent;
  let fixture: ComponentFixture<AtmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
