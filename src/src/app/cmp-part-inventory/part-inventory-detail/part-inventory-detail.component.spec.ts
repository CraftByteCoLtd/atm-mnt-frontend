import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartInventoryDetailComponent } from './part-inventory-detail.component';

describe('PartInventoryDetailComponent', () => {
  let component: PartInventoryDetailComponent;
  let fixture: ComponentFixture<PartInventoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartInventoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartInventoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
