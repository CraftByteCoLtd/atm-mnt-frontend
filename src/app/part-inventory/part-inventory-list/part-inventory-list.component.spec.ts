import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartInventoryListComponent } from './part-inventory-list.component';

describe('PartInventoryListComponent', () => {
  let component: PartInventoryListComponent;
  let fixture: ComponentFixture<PartInventoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartInventoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
