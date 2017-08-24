import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchTicketItemComponent } from './dispatch-ticket-item.component';

describe('DispatchTicketItemComponent', () => {
  let component: DispatchTicketItemComponent;
  let fixture: ComponentFixture<DispatchTicketItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchTicketItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchTicketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
