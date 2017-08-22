import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDispatchTicketComponent } from './my-dispatch-ticket.component';

describe('MyDispatchTicketComponent', () => {
  let component: MyDispatchTicketComponent;
  let fixture: ComponentFixture<MyDispatchTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDispatchTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDispatchTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
