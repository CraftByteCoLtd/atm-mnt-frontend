import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Atm } from '../../_models/atm.model';
import _ from "lodash";

@Component({
  selector: 'app-dispatch-map-with-markers',
  templateUrl: './dispatch-map-with-markers.component.html',
  styleUrls: ['./dispatch-map-with-markers.component.css']
})
export class DispatchMapWithMarkersComponent implements OnInit {

  @Input() atms: Atm[];
  lat: number = 39.90183534416827;
  lng: number = -101.11713409423828;
  zoom: number = 8;
  markItem: marker;
  markers: marker[] = []
  selectedCoord: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {

  }
  ngOnChanges() {
    if (this.atms) {
      this.markers.length = 0;
      _.forEach(this.atms, (atm: DtAtm) => {

        this.lat = +atm.atm.atmLocation.lat;
        this.lng = +atm.atm.atmLocation.lng;
        this.markers.push(
          {
            name: atm.atm.atmMachineID,
            balance: +atm.remainingBefore,
            actualBalance: +atm.actualRemaining,
            desc: atm,
            lat: +atm.atm.atmLocation.lat,
            lng: +atm.atm.atmLocation.lng,
            draggable: false
          }
        );
      })
    }

  }
}
interface marker {
  name?: string,
  balance?: number,
  actualBalance?: number,
  desc: DtAtm,
  lat: number,
  lng: number,
  draggable: boolean
}

interface DtAtm{
  atm:Atm;
  remainingBefore: number;
  actualRemaining:number;
  deposit: number;
  badBill: number;
  dtAtmStatus: string;
  atmLocation:AtmLocation;
  atmStatus:string;
}


interface AtmLocation {
  lat: Number;
  lng: Number;

}
