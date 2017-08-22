import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  @Input() userId: string;


  constructor() { }

  ngOnInit() {
  }

}
