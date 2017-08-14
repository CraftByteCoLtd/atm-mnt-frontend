import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.css']
})
export class AtmComponent implements OnInit {
  lat:number = 51.678418;
  lng:number = 7.809007;
  zoom:number = 10;
  markers: marker[] = [
      {
        name:'ATM1',
        desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        lat:51.678418,
        lng:7.809007,
        dragable:true
      },
      {
        name:'ATM2',
        desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        lat:51.678418,
        lng:7.909007,
        dragable:true
      },
      {
        name:'ATM3',
        desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        lat:51.678416,
        lng:7.709007,
        dragable:true
      }
  ]
  constructor() { }

  ngOnInit() {
  }
}
interface marker{
  name?:string,
  desc?:string,
  lat:number,
  lng:number,
  dragable:boolean
}
