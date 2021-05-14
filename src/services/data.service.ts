import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' 
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { Todo } from 'src/app/models/todo';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private requestService:RequestService) { }


  findAllUser(): Observable<Array<User>> {
      return this.http.get<Array<User>>(`${environment.api}/users`).pipe(
        tap(),
        catchError(this.handleError)
     )
  }
  
  findAllTodo(): Observable<Array<Todo>> {
      return this.http.get<Array<Todo>>(`${environment.api}/todos`).pipe(
        tap(),
        catchError(this.handleError)
      );
  }    

  patch(id:any, params:any){
    return this.requestService.patch(environment.api+'/todos/:'+ id, params).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  delete(id:any, params:any) {
    return this.requestService.delete(environment.api+'/todos/:'+ id).pipe(
      tap(),
      catchError(this.handleError)
    );
  }


  private handleError (error: Response | any) {
    let errMsg = `${error.status} - ${error.statusText || ''}`;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  





  

}
