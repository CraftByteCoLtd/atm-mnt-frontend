import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmItemComponent } from './atm-item.component';

describe('AtmItemComponent', () => {
  let component: AtmItemComponent;
  let fixture: ComponentFixture<AtmItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
