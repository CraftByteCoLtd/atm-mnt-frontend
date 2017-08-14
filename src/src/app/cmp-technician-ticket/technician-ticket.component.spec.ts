import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianTicketComponent } from './technician-ticket.component';

describe('TechnicianTicketComponent', () => {
  let component: TechnicianTicketComponent;
  let fixture: ComponentFixture<TechnicianTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
