import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http: HttpClient) { }

  private usersUrl = "http://localhost:9090/medicoApp/admin/";

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl + "allUsers");
  }

  public updateUser(name: string, data: any): Observable<any> {
    return this.http.put<any>(this.usersUrl + "users/" + name, data);
  }

  public deleteUser(name: string): Observable<any> {
    return this.http.delete<any>(this.usersUrl + name);
  }
}
