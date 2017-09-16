import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryListComponent } from './treasury-list.component';

describe('TreasuryListComponent', () => {
  let component: TreasuryListComponent;
  let fixture: ComponentFixture<TreasuryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasuryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
