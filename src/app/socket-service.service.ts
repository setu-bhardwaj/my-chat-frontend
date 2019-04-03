import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/take'
//import 'rxjs/add/operator/toPromise';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse,HttpHeaders,HttpParams} from '@angular/common/http';

//import observable related code (as per version 6)
import { Observable } from 'rxjs';
//import { catchError,tap,map } from 'rxjs/operators';

import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  //https://chatapi.edwisor.com/apiDoc/
 // https://chatapi.edwisor.com/eventDoc/

 private url = 'https://chatapi.edwisor.com';
  private socket;

  constructor(public _http: HttpClient) { 
    console.log('socket service called');
    //this is part where connection created
    this.socket = io(this.url); //that handshake
  }

  //events to be listened

public verifyUser = () =>{

  return Observable.create((observer) => {
  this.socket.on('verifyUser',(data) =>{   //data from event to be callback fn
    observer.next(data);
  })//end socket
  });//end Observable
}//verifyUser



public onlineUserList = () =>{

  return Observable.create((observer) => {
  this.socket.on('online-user-list',(userList) =>{
    observer.next(userList);
  })//end socket
  });//end Observable
}//onlineUserList

public disconnect = () =>{

  return Observable.create((observer) => {
  this.socket.on('disconnect',() =>{
    observer.next();
  })//end socket
  });//end Observable
}//disconnect


//events to be emitted

public setUser =(authToken) =>{
  this.socket.emit('set-user',authToken)
}//setUser

public markChatAsSeen = (userDetails) => {

  this.socket.emit('mark-chat-as-seen', userDetails);

} // end markChatAsSeen


  // chat related methods 

  

  public getChat(senderId, receiverId, skip): Observable<any> {

    return this._http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId}
    &receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get('authtoken')}`)
    //new as per latest angular version
    .pipe(
      tap(data => console.log('Data Received'),
      this.handleError

      )
    )
    //old
   // .do(data => console.log('Data Received'))
     // .catch(this.handleError);

  } 


  //listening to own user id for getting our own message.
  public chatByUserId = (userId) => {

    return Observable.create((observer) => {
      
      this.socket.on(userId, (data) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  } // end chatByUserId

  public SendChatMessage = (chatMsgObject) => {

    this.socket.emit('chat-msg', chatMsgObject);

  } // end getChatMessage


  public exitSocket = () =>{
    this.socket.disconnect();
  }// end exit socket

//error handler exception
private handleError (err: HttpErrorResponse){
  let errorMessage = '';
  if (err.error instanceof Error){
    errorMessage = `An error occured : ${err.error.message}`;
  }
  else{
    errorMessage = `Server returned code : ${err.status} , error message is : ${err.error.message}`
  }
  console.log(errorMessage);
  return Observable.throw(errorMessage);
}//end handleError



}//end class