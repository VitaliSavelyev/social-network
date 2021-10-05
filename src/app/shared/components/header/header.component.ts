import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../admin/shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  page: string[] = ['/admin', 'login'];

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.page = ['/admin', 'users']
    }
  }

}
