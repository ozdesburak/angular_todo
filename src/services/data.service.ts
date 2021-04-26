import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' 
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
    private requestService:RequestService) { }


  getTodo() {
    const result = this.requestService.get(environment.base_path+'/todos')
    return result
  }
  getUser() {
    const result = this.requestService.get(environment.base_path+'/users')
    return result
  }
  patch(id:any, params:any){
    const result = this.requestService.patch( environment.base_path+'/todos/:'+ id, params)
    return result
  }
  delete(id:any, params:any) {
    const result = this.requestService.delete(environment.base_path+'/todos/:'+ id)
    return result
  }
  

}
