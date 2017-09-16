import { Component, OnInit, Input } from '@angular/core';
import { DispatchTicket } from '../../_models/dispatch-ticket.model';

@Component({
  selector: 'app-dispatch-ticket-item',
  templateUrl: './dispatch-ticket-item.component.html',
  styleUrls: ['./dispatch-ticket-item.component.css']
})
export class DispatchTicketItemComponent implements OnInit {
  @Input() dt: DispatchTicket;
  @Input() dtId: string;


  constructor() { }

  ngOnInit() {

  }

}
