import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UsersService} from "../shared/services/users.service";
import {switchMap} from "rxjs/operators";
import {formEducation, User} from "../../shared/intrefeces";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AgeValidator} from "../shared/validators/age.validators";
import {EduValidator} from "../shared/validators/education.validators";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form:FormGroup = new FormGroup({})
  userChange: User = {birthday: new Date, about: "", city: "", educations: [], name: "", surname: "", country:""};
  submitted: boolean = false;
  nameFile: string = '';
  dateBth!:Date;
  dateEnd!:Date;
  dateEntry!:Date;
  // @ts-ignore
  selectedFile: File;
  imgSRC = ''

  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params
      .pipe(switchMap((params:Params) => {
        return this.usersService.getById(params['id'])
      })).subscribe((user:User) => {
        this.imgSRC = user.avatar
        this.userChange = user
        this.form = new FormGroup({
          name: new FormControl(user.name, Validators.required),
          surname: new FormControl(user.surname, Validators.required),
          birthday: new FormControl(new Date(user.birthday), [
            Validators.required,
            AgeValidator]
          ),
          country: new FormControl(user.country),
          city: new FormControl(user.city, Validators.required),
          educations: new FormArray( this.giveOldEdu(user.educations), ),
          avatar: new FormControl(user.avatar, Validators.required),
          about: new FormControl(user.about, Validators.required),
        },)
    }
    )
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
  get _birthday () {
    return this.form.get('birthday') as FormControl
  }
  get _educations () {
    return this.form.get('educations') as FormArray
  }
  get _about () {
    return this.form.get('about') as FormControl
  }
  get _avatar () {
    return this.form.get('avatar') as FormControl
  }
  submit () {
    if (this.form.invalid){
      return
    }
    this.submitted = true;
    this.usersService.update({
      name: this.form.value.name,
      surname: this.form.value.surname,
      birthday: this.form.value.birthday,
      city: this.form.value.city,
      country: this.form.value.country,
      educations: this.form.value.educations,
      about: this.form.value.about,
      avatar: this.form.value.avatar,
      id: this.userChange.id
    }).subscribe(()=>{
       this.form.reset()
      this.submitted = false
      this.router.navigate(['/admin','users'])
    })
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
  giveOldEdu (oldEdu: []): FormGroup[] {
    console.log(oldEdu)
    const giveEdu = oldEdu.map((edu:formEducation)=>{
      return new FormGroup({
        educationTitle: new FormControl(edu.educationTitle, Validators.required),
        dateEntry: new FormControl(new Date(edu.dateEntry), Validators.required),
        dateEnd: new FormControl(new Date(edu.dateEnd),  Validators.required,),
      }, [EduValidator])
    })
    return giveEdu
  }
  deleteEdu (index: number) {
    this._educations.removeAt(index);
  }
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.nameFile = event.target.files[0].name
      const reader = new FileReader();
      reader.onload = (event: any) => {
        console.log(event.target.result);
        this.selectedFile = event.target.result
        this.userChange.avatar = this.selectedFile
        this.form.patchValue({
          avatar: this.selectedFile
        });
        this.imgSRC = this.userChange.avatar
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
