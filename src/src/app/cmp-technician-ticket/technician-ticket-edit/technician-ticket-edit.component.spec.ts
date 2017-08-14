import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianTicketEditComponent } from './technician-ticket-edit.component';

describe('TechnicianTicketEditComponent', () => {
  let component: TechnicianTicketEditComponent;
  let fixture: ComponentFixture<TechnicianTicketEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianTicketEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianTicketEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
