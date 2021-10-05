import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/intrefeces";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  @Input() user!:User

  constructor() { }

  ngOnInit(): void {
  }

}
