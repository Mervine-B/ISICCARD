import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { typeofcardModel } from '../models/typeofcard.model';
import { ResponseLogin } from '../models/login.model';
import { apibase } from '../../environment/constantes';

@Injectable({
  providedIn: 'root'
})
export class TypeofcardService {

  constructor( private http : HttpClient,
    private globalService : GlobalService
  ) { }

  typeofcardGet(): Observable<typeofcardModel[]>{

    const obj = this.globalService.getItem('agentlogin')
    if (obj){
      const resp: ResponseLogin = JSON.parse(obj)
      const header : HttpHeaders = new HttpHeaders({
        Authorization: "Bearer " + resp.token
      })

      const url = apibase + "/TypeOfCard"
      return this.http.get<typeofcardModel[]>(url , {headers : header})
    }
    const url = apibase + "/TypeOfCard"
      return this.http.get<typeofcardModel[]>(url )
  }
}
