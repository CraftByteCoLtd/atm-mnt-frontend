import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchTicketComponent } from './dispatch-ticket.component';

describe('DispatchTicketComponent', () => {
  let component: DispatchTicketComponent;
  let fixture: ComponentFixture<DispatchTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
