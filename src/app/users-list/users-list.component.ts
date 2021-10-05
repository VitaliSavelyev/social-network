import { Component, OnInit } from '@angular/core';
import {UsersService} from "../admin/shared/services/users.service";
import {Observable} from "rxjs";
import {User} from "../shared/intrefeces";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users$!: Observable<User[]>;
  searchUser: string = ''

  constructor(private usersService: UsersService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
      this.users$ = this.usersService.getAll()
  }
}
