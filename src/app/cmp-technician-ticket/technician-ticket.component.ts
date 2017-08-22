import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-technician-ticket',
  templateUrl: './technician-ticket.component.html',
  styleUrls: ['./technician-ticket.component.css']
})
export class TechnicianTicketComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  onAddNewTicket(){
    this.router.navigate(['new'], { relativeTo: this.route });

  }

}
