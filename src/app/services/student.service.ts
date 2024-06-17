import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentModel } from '../models/student.model';
import { ResponseLogin } from '../models/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { apibase } from '../../environment/constantes';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) { }

  studentGet (): Observable<StudentModel[]>{
    const obj = this.globalService.getItem('agentlogin')
    if (obj){
      const resp: ResponseLogin = JSON.parse(obj)
      const header : HttpHeaders = new HttpHeaders({
        Authorization: "Bearer " + resp.token
      })

      const url = apibase + "/api/Student"
      return this.http.get<StudentModel[]>(url , {headers : header})
    }
    const url = apibase + "/api/Student"
      return this.http.get<StudentModel[]>(url )
  }

  studentPost( data: StudentModel):Observable<StudentModel>{
    console.log("Données de l'agent à envoyer au serveur :", data);
    const obj = this.globalService.getItem('agentlogin')
    console.log(obj)
    if (obj){

      const resp: ResponseLogin = JSON.parse(obj)
      const header: HttpHeaders = new HttpHeaders({
        Authorization : "Bearer " + resp.token

      })
    const url = apibase +"/api/Client"
    return this.http.post<StudentModel>(url, data, {headers: header}) 
  }

  const url = apibase +"/api/Client"
    return this.http.post<StudentModel>(url , data)
}

studentUpdate(student : StudentModel){
  const obj = this.globalService.getItem('agentlogin')
  console.log(obj)
  if (obj){

    const resp: ResponseLogin = JSON.parse(obj)
    const header: HttpHeaders = new HttpHeaders({
      Authorization : "Bearer " + resp.token

    })

  const url = apibase + "/api/Client"
  return this.http.put<StudentModel>(url, student, {headers: header}) 
}
const url = apibase + "/api/Client"
return this.http.put<StudentModel>(url, student)
}

studentDelete(idStudent: number){
  const obj = this.globalService.getItem('agentlogin')
  console.log(obj)
  if (obj){

    const resp: ResponseLogin = JSON.parse(obj)
    const header: HttpHeaders = new HttpHeaders({
      Authorization : "Bearer " + resp.token

    })
  
  const url = apibase + "/api/Student?id=" + idStudent
  return this.http.delete<StudentModel>(url,{headers: header}) 
}
const url = apibase + "/api/Student"
return this.http.delete<StudentModel>(url) 
}
}
