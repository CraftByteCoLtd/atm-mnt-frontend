import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Atm } from '../../_models/atm.model';

@Component({
  selector: 'app-map-with-marker',
  templateUrl: './map-with-marker.component.html',
  styleUrls: ['./map-with-marker.component.css']
})
export class MapWithMarkerComponent implements OnInit, OnChanges {
  @Input() atm: Atm;
  @Output() onDraggedLocation = new EventEmitter<marker>();
  lat: number = 39.90183534416827;
  lng: number = -101.11713409423828;
  zoom: number = 15;
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
    if (this.atm) {
      this.lat = +this.atm.atmLocation.lat;
      this.lng = +this.atm.atmLocation.lng;

      this.markers.length = 0;
      this.markers.push(
        {
          name: this.atm.atmMachineID,
          desc: this.atm.atmNote,
          balance: +this.atm.atmBalance,
          lat: +this.atm.atmLocation.lat,
          lng: +this.atm.atmLocation.lng,
          draggable: true
        }
      );

    }

  }

  mapClicked($event: MouseEvent) {
    this.setMarker($event['coords']);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    this.setMarker($event['coords']);
  }

  setMarker(m: marker) {
    this.markers.length = 0;
    this.markItem = {
      name: this.atm.atmMachineID,
      desc: this.atm.atmNote,
      balance: +this.atm.atmBalance,
      lat: +m['lat'],
      lng: +m['lng'],
      draggable: true
    };
    this.markers.push(
      this.markItem
    );

    this.onDraggedLocation.emit(this.markItem);

  }
}
interface marker {
  name?: string,
  desc?: string,
  balance?: number,
  lat: number,
  lng: number,
  draggable: boolean
}
