import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UsersService} from "../admin/shared/services/users.service";
import {formEducation, User} from "../shared/intrefeces";
import {switchMap} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  user: User = {birthday: new Date, about: "", city: "", educations: [], name: "", surname: "", country:""};
  age: number = 0;
  load: string = '';
  educations: formEducation[] = []

  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.usersService.getById(params['id'])
      })).subscribe((user:User) => {
        this.user = user;
        this.load = 'OK';
        this.educations = user.educations
      this.age = Math.abs(new Date().getFullYear() - new Date(user.birthday).getFullYear())
      })

  }

}
