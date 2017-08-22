import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchTicketListComponent } from './dispatch-ticket-list.component';

describe('DispatchTicketListComponent', () => {
  let component: DispatchTicketListComponent;
  let fixture: ComponentFixture<DispatchTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
