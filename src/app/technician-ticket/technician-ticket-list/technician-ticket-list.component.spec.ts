import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianTicketListComponent } from './technician-ticket-list.component';

describe('TechnicianTicketListComponent', () => {
  let component: TechnicianTicketListComponent;
  let fixture: ComponentFixture<TechnicianTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
