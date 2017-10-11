import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmStartPageComponent } from './atm-start-page.component';

describe('AtmStartPageComponent', () => {
  let component: AtmStartPageComponent;
  let fixture: ComponentFixture<AtmStartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmStartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
