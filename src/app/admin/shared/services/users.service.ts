import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../shared/intrefeces";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private http:HttpClient,
              private spinner: NgxSpinnerService) {
  }
  create(user:User):Observable<User>{
    return this.http.post<User>(`${environment.fbDbUrl}/users.json`, user)
      .pipe(map((response) => {
        const newUser: User = {
          ...user,
          id: response.name
        }
        console.log(newUser)
        return newUser
      }))
  }
  getAll (): Observable<User[]> {
    this.spinner.show();
    return  this.http.get(`${environment.fbDbUrl}/users.json`)
      .pipe(
        map((response:{[key: string]:any})=>{
          this.spinner.hide()
          return Object.keys(response)
            .map(key => ({
              ...response[key],
              id: key
            }))
        }))

  }
  remove (id:string):Observable<void>{
    return this.http.delete<void>(`${environment.fbDbUrl}/users/${id}.json`)
  }
  getById (id:string): Observable<User> {
    return this.http.get<User>(`${environment.fbDbUrl}/users/${id}.json`)
      .pipe(
        map((user:User) => {
          this.spinner.hide()
          return {
            ...user,
            id
          }
        }))
  }
  update (user: User): Observable<User> {
    return this.http.patch<User>(`${environment.fbDbUrl}/users/${user.id}.json`, user)
  }
}
