import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapWithMarkerComponent } from './map-with-marker.component';

describe('MapWithMarkerComponent', () => {
  let component: MapWithMarkerComponent;
  let fixture: ComponentFixture<MapWithMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapWithMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapWithMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
