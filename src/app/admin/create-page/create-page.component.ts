import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/intrefeces";
import {UsersService} from "../shared/services/users.service";
import {Router} from "@angular/router";
import {AgeValidator} from "../shared/validators/age.validators";
import {EduValidator} from "../shared/validators/education.validators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  nameFile: string = ''
  dateBth!:Date;
  // @ts-ignore
  selectedFile: File;
  constructor(private userService: UsersService,
              private router: Router,
              private http: HttpClient,
              ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      birthday: new FormControl('', [
        Validators.required,
        AgeValidator]
        ),
      country: new FormControl('by'),
      city: new FormControl('', Validators.required),
      educations: new FormArray( [this.buildEdu()], ),
      avatar: new FormControl(''),
      about: new FormControl('', Validators.required),
    },)
  }
  get _name () {
    return this.form.get('name') as FormControl
  }
  get _surname () {
    return this.form.get('surname') as FormControl
  }
  get _city () {
    return this.form.get('city') as FormControl
  }
  get _about () {
    return this.form.get('about') as FormControl
  }
  get _birthday () {
    return this.form.get('birthday') as FormControl
  }
  get _educations () {
    return this.form.get('educations') as FormArray
  }
  get _avatar () {
    return this.form.get('avatar') as FormControl
  }
  addEdu () {
    (this.form.get('educations') as FormArray).push(this.buildEdu())
  }
  buildEdu (): FormGroup {
    let formAdu = new FormGroup({})
    formAdu = new FormGroup  ({
        educationTitle: new FormControl('', Validators.required),
        dateEntry: new FormControl('', Validators.required),
        dateEnd: new FormControl('',  Validators.required,),
    },[EduValidator])
    return formAdu
  }
  deleteEdu (index: number) {
      this._educations.removeAt(index);
  }

  submit () {
    if (this.form.invalid){
      return
    }
    const user: User = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      birthday: this.form.value.birthday,
      city: this.form.value.city,
      country: this.form.value.country,
      educations: this.form.value.educations,
      about: this.form.value.about,
      avatar: this.form.value.avatar
    }
    this.userService.create(user).subscribe(()=>{
      this.router.navigate(['/admin', 'users'])
      this.form.reset()
    })
  }
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.nameFile = event.target.files[0].name
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.selectedFile = event.target.result
          this.form.patchValue({
            avatar: this.selectedFile
          });
        }
        reader.readAsDataURL(event.target.files[0]);
    }
  }
}
