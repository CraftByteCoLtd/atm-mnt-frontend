import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmListComponent } from './atm-list.component';

describe('AtmListComponent', () => {
  let component: AtmListComponent;
  let fixture: ComponentFixture<AtmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
