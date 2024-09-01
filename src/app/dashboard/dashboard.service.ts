import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private allDetailsUrl = "http://localhost:9090/medicoApp/allMediDetails";
  private statusUpdateUrl = "http://localhost:9090/medicoApp/medDetails/";
  private deleteDetailsUrl = "http://localhost:9090/medicoApp/";

  constructor(private http: HttpClient) { }

  public getAllMediDetails(): Observable<any> {
    return this.http.get<any>(this.allDetailsUrl);
  }

  public UpdateStatus(name: string, data: any): Observable<any> {
    return this.http.put<any>(this.statusUpdateUrl + name, data)
  }

  public DeleteMediDetails(name: string): Observable<any> {
    return this.http.delete<any>(this.deleteDetailsUrl + name)
  }


}
