import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartInventoryComponent } from './part-inventory.component';

describe('PartInventoryComponent', () => {
  let component: PartInventoryComponent;
  let fixture: ComponentFixture<PartInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
