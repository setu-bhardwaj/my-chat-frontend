import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpParams} from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/toPromise';





//import observable related code (as per version 6)
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  public baseUrl = 'https://chatapi.edwisor.com/api/v1';
public authToken = 'MDA5NGMyMjQ2YzJkMDdlMWVjYmFjMTcxMzlhYWRmYjhiMzMwNzhmMWY0NTY0NjRmNzg5Yjc4NjY0Mjg3NTM3MWQ2MzMxYjU0YjhmY2MwNTlhMWFjN2JiY2FmMGNiYjQyYjU2NTQ4YjAyZjUzYjVkNjJlOGZkNDM2MzJlOWMyYzc0MA==';
   //https://chatapi.edwisor.com/apiDoc/

  constructor(public _http: HttpClient) {
    console.log("app service constructor is called");
   }//end constructor

   public gertUserInfoFromLocalStorage = () =>{
      return JSON.parse(localStorage.getItem('userInfo'));
   }

   public setUserInfoInLocalStorage = (data) => {
     return localStorage.setItem('userInfo',JSON.stringify(data));
   }


  
   

     //exceptional handler
private handleError(err:HttpErrorResponse){
  console.log('Handle error http calls');
  console.log(err.message);
  return Observable.throw(err.message);
}

  public signupFunction(data):Observable<any> {
    let myResponse = this._http.post(this.baseUrl+'/users/signup?authToken='+this.authToken,data);
    console.log(myResponse);
  return myResponse;


  }//signupFunction

  public signinFunction(data): Observable<any> {
    
    let myResponse = this._http.post(this.baseUrl+'/users/login?authToken='+this.authToken,data);
    console.log(myResponse);
    return myResponse;
    
  
  }//signinFunction

  public logout(): Observable<any> {

    const params = new HttpParams().set('authToken', Cookie.get('authtoken'))

    return this._http.post(`${this.baseUrl}/api/v1/users/logout`, params);

  } // end logout function
}
