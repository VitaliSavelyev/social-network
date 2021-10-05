import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Admin} from "../../../shared/intrefeces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs/operators";
import {FBAuthResponse} from "../../../shared/intrefeces";

@Injectable()
export class AuthService {
  constructor(private http:HttpClient) {
  }
  get token(): string | null {
    // @ts-ignore
    const expDate : Date = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate){
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(admin:Admin): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, admin)
      .pipe(
        tap(this.setToken))
  }
  logout () {
    this.setToken(null)

  }
  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken (response : FBAuthResponse | null) {
    if (response){
      const expDate = new Date(new Date().getTime() + Number(response.expiresIn)*1000);
      localStorage.setItem('fb-token', String(response.idToken));
      localStorage.setItem('fb-token-exp', String(expDate))
    } else {
      localStorage.clear()
    }
}

}
