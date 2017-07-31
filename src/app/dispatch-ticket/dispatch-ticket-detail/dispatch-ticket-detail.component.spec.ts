import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchTicketDetailComponent } from './dispatch-ticket-detail.component';

describe('DispatchTicketDetailComponent', () => {
  let component: DispatchTicketDetailComponent;
  let fixture: ComponentFixture<DispatchTicketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchTicketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
