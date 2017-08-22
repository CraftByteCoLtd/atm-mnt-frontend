import { Component, OnInit ,Input} from '@angular/core';
import { Atm } from '../../_models/atm.model';

@Component({
  selector: 'app-atm-item',
  templateUrl: './atm-item.component.html',
  styleUrls: ['./atm-item.component.css']
})
export class AtmItemComponent implements OnInit {

 @Input() atm: Atm;
 @Input() atmId: string;
  constructor() { }

  ngOnInit() {
  }

}
