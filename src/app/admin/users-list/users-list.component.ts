import {Component, OnInit, Type } from '@angular/core';
import {UsersService} from "../shared/services/users.service";
import {User} from "../../shared/intrefeces";
import {NgbModal, NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {

  users: User[] = [];
  searchUser: string  = '';

  constructor(private userService: UsersService,
              private spinner: NgxSpinnerService,
              private alertService: AlertService
              ) { }

  ngOnInit() {
    this.userService.getAll().subscribe( users => {
      this.users = users
    })
  }
  public openConfirmationDialog(id: string) {
    this.alertService.confirm()
      .then((confirmed) => {
        if (confirmed){
          this.remove(id)
        }
      })
      .catch(() => Error);
  }
  remove (id: string) {
    if (id){
      this.userService.remove(id).subscribe(()=> {
        this.users = this.users.filter( user => user.id !== id)
      })
    }
  }
}
