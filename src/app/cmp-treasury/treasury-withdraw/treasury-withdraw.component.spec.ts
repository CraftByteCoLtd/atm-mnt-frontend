import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryWithdrawComponent } from './treasury-withdraw.component';

describe('TreasuryWithdrawComponent', () => {
  let component: TreasuryWithdrawComponent;
  let fixture: ComponentFixture<TreasuryWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasuryWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
