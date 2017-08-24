import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-part-inventory',
  templateUrl: './part-inventory.component.html',
  styleUrls: ['./part-inventory.component.css']
})
export class PartInventoryComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onAddNewPart(){
    this.router.navigate(['new'], { relativeTo: this.route });

  }
}
