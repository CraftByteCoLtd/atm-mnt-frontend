import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryItemComponent } from './treasury-item.component';

describe('TreasuryItemComponent', () => {
  let component: TreasuryItemComponent;
  let fixture: ComponentFixture<TreasuryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasuryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
