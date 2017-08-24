import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartInventoryItemComponent } from './part-inventory-item.component';

describe('PartInventoryItemComponent', () => {
  let component: PartInventoryItemComponent;
  let fixture: ComponentFixture<PartInventoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartInventoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
