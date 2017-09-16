import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchMapWithMarkersComponent } from './dispatch-map-with-markers.component';

describe('DispatchMapWithMarkersComponent', () => {
  let component: DispatchMapWithMarkersComponent;
  let fixture: ComponentFixture<DispatchMapWithMarkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchMapWithMarkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchMapWithMarkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
