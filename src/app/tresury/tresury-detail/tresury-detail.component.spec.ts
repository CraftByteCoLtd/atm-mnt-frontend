import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TresuryDetailComponent } from './tresury-detail.component';

describe('TresuryDetailComponent', () => {
  let component: TresuryDetailComponent;
  let fixture: ComponentFixture<TresuryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TresuryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TresuryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
