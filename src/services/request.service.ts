import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }


  
  // Method 1
  // get(path: string): Observable<any> {
  //   const url = path
  //   return this.http.get<any>(url)
  // }


  // method 2
  // public async get(path:string) {
  //   try {
  //     let result = await this.http.get<any>(path).toPromise();
  //     return result;
  //   } catch (error) {
  //     return error;
  //   }
  // }
  
 // method 3
  get(path: string): Observable<any> {
    const url = path
    return this.http.get<any>(url).pipe(
      map((res: any) => {
        // console.log(res);
        return res;
      }),
      catchError(<T>(error: any, result?: T) => {
        console.log(error);
        return of(result as T);
      })
    );
  }
  patch(path: string, params: any): Observable<any> {
    const url = path
    return this.http.patch<any>(url, params)
  }
  delete(path: string): Observable<any> {
    const url = path
    return this.http.delete<any>(url)
  }
  

  private handleError (error: Response | any) {
    let errMsg = `${error.status} - ${error.statusText || ''}`;
    console.log('deu erro');
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
