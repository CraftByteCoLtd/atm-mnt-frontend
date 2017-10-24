import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AppConfigService } from '../../_services/app-config.service';
import { PartInventoryService } from '../../_services/part-inventory.service';

import { Part } from '../../_models/part.model';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-part-inventory-list',
  templateUrl: './part-inventory-list.component.html',
  styleUrls: ['./part-inventory-list.component.css']
})
export class PartInventoryListComponent implements OnInit {

  parts: Part[];
  partsSubscription: Subscription;
  subjectSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private partService: PartInventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.partsSubscription = this.partService.getParts()
     .subscribe(
       (parts: Part[]) => {
         this.parts = parts;
         this.partService.setListPart(parts);
       }
     );

     this.partsSubscription = this.partService.partChanged
      .subscribe(
        (parts: Part[]) => {
          this.parts = parts;
        }
      );

     this.parts = this.partService.getListPart();

  }

}
