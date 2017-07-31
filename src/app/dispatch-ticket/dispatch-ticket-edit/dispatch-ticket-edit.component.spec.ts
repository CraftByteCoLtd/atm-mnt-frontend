import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchTicketEditComponent } from './dispatch-ticket-edit.component';

describe('DispatchTicketEditComponent', () => {
  let component: DispatchTicketEditComponent;
  let fixture: ComponentFixture<DispatchTicketEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchTicketEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchTicketEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
