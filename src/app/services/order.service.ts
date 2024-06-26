import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ordermodel } from "../models/order.model";
import { apibase } from "../../environment/constantes";
import { ResponseLogin } from "../models/login.model";
import { GlobalService } from "./global.service";




@Injectable({
    providedIn:'root'
})

export class OrderService {
    constructor(
        private http :HttpClient,
        private globalService: GlobalService
    ){}

    orderGet(): Observable<Ordermodel[]>{
        const obj = this.globalService.getItem('agentlogin')
        if(obj){
            const resp: ResponseLogin = JSON.parse(obj)
            const header: HttpHeaders = new HttpHeaders({
                Authorization: "Bearer " + resp.token
            })
            const url = apibase + "/api/Order"
            return this.http.get<Ordermodel[]>(url, {headers: header})  
        }
        const url = apibase + "/api/Order"
        return this.http.get<Ordermodel[]>(url)
    }

    orderUpdate(order : Ordermodel){
      const obj = this.globalService.getItem('agentlogin')
      console.log(obj)
      if (obj){
    
        const resp: ResponseLogin = JSON.parse(obj)
        const header: HttpHeaders = new HttpHeaders({
          Authorization : "Bearer " + resp.token
    
        })
    
      const url = apibase + "/api/Order"
      return this.http.put<Ordermodel>(url, order, {headers: header}) 
    }
    const url = apibase + "/api/Order"
    return this.http.put<Ordermodel>(url, order)
    }
  
}

