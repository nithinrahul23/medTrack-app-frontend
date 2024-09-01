import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedDetailsService {

  private medTypeUrl = "http://localhost:9090/medicoApp/mediType";
  private conTypeUrl = "http://localhost:9090/medicoApp/conType";
  private mediDetailsUrl = "http://localhost:9090/medicoApp/medDetails";

  constructor(private http:HttpClient) { }

  public getMedType():Observable<any>{
    return this.http.get<any>(this.medTypeUrl);
  }

  public addMedicineDetails(data : any):Observable<any>{
    return this.http.post<any>(this.mediDetailsUrl, data)
  }

}
