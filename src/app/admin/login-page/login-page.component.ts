import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Admin} from "../../shared/intrefeces";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form:FormGroup = new FormGroup({});
  submitted: boolean =false

  constructor(private  auth: AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('',[
          Validators.required,
          Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  get _email () {
    return this.form.get('email') as FormControl
  }
  get _password () {
    return this.form.get('password') as FormControl
  }

  submit() {
    if (this.form.invalid){
      return
    }
    this.submitted = true
    const admin: Admin = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }
    this.auth.login(admin)
      .subscribe(()=>{
      this.form.reset()
      this.router.navigate(['/admin', 'users'])
        this.submitted = false
    })
  }
}
