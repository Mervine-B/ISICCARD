import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentModel } from '../models/agent.model';
import { ResponseLogin } from '../models/login.model';
import { parse } from 'path';
import { apibase } from '../../environment/constantes';
import { FormulaireModel } from '../models/formulaire.model';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(
    private http : HttpClient,
    private globalService: GlobalService
  ) { }

  agentGet():Observable<AgentModel[]>{
    const obj = this.globalService.getItem('agentlogin')
    console.log(obj)
    if (obj){
      const resp: ResponseLogin = JSON.parse(obj)
      const header: HttpHeaders = new HttpHeaders({
        Authorization : "Bearer " + resp.token

      })
      const url = apibase + "/api/Agent"
      return this.http.get<AgentModel[]>(url, {headers: header})  
    }
    const url = apibase + "/api/Agent"
    return this.http.get<AgentModel[]>(url)
  }

  agentPost( data: AgentModel):Observable<AgentModel>{
    console.log("Données de l'agent à envoyer au serveur :", data);
    const obj = this.globalService.getItem('agentlogin')
    console.log(obj)
    if (obj){

      const resp: ResponseLogin = JSON.parse(obj)
      const header: HttpHeaders = new HttpHeaders({
        Authorization : "Bearer " + resp.token

      })
    const url = apibase +"/api/Agent"
    return this.http.post<FormulaireModel>(url, data, {headers: header}) 
  }

  const url = apibase +"/api/Agent"
    return this.http.post<FormulaireModel>(url , data)
}

agentUpdate(agent : AgentModel){
  const obj = this.globalService.getItem('agentlogin')
  console.log(obj)
  if (obj){

    const resp: ResponseLogin = JSON.parse(obj)
    const header: HttpHeaders = new HttpHeaders({
      Authorization : "Bearer " + resp.token

    })

  const url = apibase + "/api/Agent"
  return this.http.put<FormulaireModel>(url, agent, {headers: header}) 
}
const url = apibase + "/api/Agent"
return this.http.put<FormulaireModel>(url, agent)
}

agentDelete(idAgent: number){
  const obj = this.globalService.getItem('agentlogin')
  console.log(obj)
  if (obj){

    const resp: ResponseLogin = JSON.parse(obj)
    const header: HttpHeaders = new HttpHeaders({
      Authorization : "Bearer " + resp.token

    })
  
  const url = apibase + "/api/Agent?id" + idAgent
  return this.http.delete<FormulaireModel>(url,{headers: header}) 
}
const url = apibase + "/api/Agent"
return this.http.delete<FormulaireModel>(url) 
}

  
}