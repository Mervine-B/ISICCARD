import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel, ResponseLogin } from '../models/login.model';
import { apibase } from '../../environment/constantes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  loginPost(data: LoginModel): Observable<ResponseLogin>{
    const url = apibase + "/api/Login/agentlogin"
    return this.http.post<ResponseLogin>(url, data)
  }
}
