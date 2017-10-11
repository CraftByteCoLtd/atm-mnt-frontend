import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchDepositItemComponent } from './dispatch-deposit-item.component';

describe('DispatchDepositItemComponent', () => {
  let component: DispatchDepositItemComponent;
  let fixture: ComponentFixture<DispatchDepositItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchDepositItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchDepositItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
