import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient, private userAuthService : UserAuthService) { }

  private registerUrl = "http://localhost:9090/medicoApp/signUp";
  private loginUrl = "http://localhost:9090/medicoApp/login"

  public registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  public loginUser(user: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

  public roleMatch(allowedRoles : any): boolean {
    let isMatch = false;
    let role : string = this.userAuthService.getRoles();
    let roleArray : string[] = [];
    if(role.includes(',')){
      roleArray = role.split(',');
    }
    else{
      roleArray = [role];
    }
    if(roleArray != null && roleArray){
      for(let i = 0; i< roleArray.length; i++){
        if(roleArray[i] == allowedRoles){
          isMatch = true;
          return isMatch;
        }
      }
    }
    return isMatch;
  }
}
