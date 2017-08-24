import { Component, OnInit ,Input} from '@angular/core';
import { Part } from '../../_models/part.model';

@Component({
  selector: 'app-part-inventory-item',
  templateUrl: './part-inventory-item.component.html',
  styleUrls: ['./part-inventory-item.component.css']
})
export class PartInventoryItemComponent implements OnInit {

  @Input() part: Part;
  @Input() partId: string;
  constructor() { }

  ngOnInit() {
  }

}
