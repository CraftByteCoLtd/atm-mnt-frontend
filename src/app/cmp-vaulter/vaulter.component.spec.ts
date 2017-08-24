import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaulterComponent } from './vaulter.component';

describe('VaulterComponent', () => {
  let component: VaulterComponent;
  let fixture: ComponentFixture<VaulterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaulterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
