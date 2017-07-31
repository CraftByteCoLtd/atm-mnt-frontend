import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TresuryListComponent } from './tresury-list.component';

describe('TresuryListComponent', () => {
  let component: TresuryListComponent;
  let fixture: ComponentFixture<TresuryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TresuryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TresuryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
