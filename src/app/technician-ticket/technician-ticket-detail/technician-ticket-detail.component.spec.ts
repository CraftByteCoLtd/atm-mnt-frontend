import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianTicketDetailComponent } from './technician-ticket-detail.component';

describe('TechnicianTicketDetailComponent', () => {
  let component: TechnicianTicketDetailComponent;
  let fixture: ComponentFixture<TechnicianTicketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianTicketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
