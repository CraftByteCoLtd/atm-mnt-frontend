import { Component, OnInit ,Input} from '@angular/core';
import { TechnicianTicket } from '../../_models/technician-ticket.model';

@Component({
  selector: 'app-technician-ticket-item',
  templateUrl: './technician-ticket-item.component.html',
  styleUrls: ['./technician-ticket-item.component.css']
})
export class TechnicianTicketItemComponent implements OnInit {
  @Input() tt: TechnicianTicket;
  @Input() ttId: string;

  constructor() { }

  ngOnInit() {
  }



}
