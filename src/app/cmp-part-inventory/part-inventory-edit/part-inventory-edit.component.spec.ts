import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartInventoryEditComponent } from './part-inventory-edit.component';

describe('PartInventoryEditComponent', () => {
  let component: PartInventoryEditComponent;
  let fixture: ComponentFixture<PartInventoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartInventoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartInventoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
