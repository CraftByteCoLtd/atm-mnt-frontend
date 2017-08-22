import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.css']
})
export class AtmComponent implements OnInit, OnDestroy {


  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

  }
  ngOnDestroy(){
  }

}
