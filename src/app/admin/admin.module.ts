import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { UsersListComponent } from './users-list/users-list.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AuthService} from "./shared/services/auth.service";
import {AuthGuard} from "./shared/services/auth.guard";
import { AdminUserComponent } from './shared/components/admin-user/admin-user.component';
import { NgbModule, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateParser
} from "@ngx-translate/core";
import { AlertComponent } from './shared/components/alert/alert.component';
import {AlertService} from "./shared/services/alert.service";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    HeaderComponent,
    LoginPageComponent,
    CreatePageComponent,
    UsersListComponent,
    EditPageComponent,
    AdminUserComponent,
    AlertComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forChild({
    }),
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
          {path: 'users', component: UsersListComponent, canActivate: [AuthGuard]},
          {path: 'users/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ]),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, AlertService],
  entryComponents: [ AlertComponent ],
})
export class AdminModule { }
