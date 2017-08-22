import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianTicketItemComponent } from './technician-ticket-item.component';

describe('TechnicianTicketItemComponent', () => {
  let component: TechnicianTicketItemComponent;
  let fixture: ComponentFixture<TechnicianTicketItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianTicketItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianTicketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
