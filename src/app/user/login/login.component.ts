
import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from './../../app.service';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;

  constructor(
    public appService: AppService,
    public router: Router,
   // private toastr: ToastsManager,
    vcr: ViewContainerRef,
  ) {

    //this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
  }
  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  } // end goToSignUp

  public signinFunction: any = () => {

    if (!this.email) {
      alert('enter email');
     // this.toastr.warning('enter email')


    } else if (!this.password) {

    alert('enter password')
      //this.toastr.warning('enter password')


    } else {

      let data = {
        email: this.email,
        password: this.password
      }

      this.appService.signinFunction(data).subscribe(
        (apiResponse) => {
          
          if (apiResponse.status === 200) {
           
            console.log(apiResponse)
              //setting up the cookies at client side
             Cookie.set('authtoken', apiResponse.data.authToken);
             Cookie.set('receiverId', apiResponse.data.userDetails.userId);
            
             Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
             this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
            
             this.router.navigate(['/chat']);

          } else {
            alert(apiResponse.message)
            //this.toastr.error(apiResponse.message)
          

          }

        },
         (err) => {
          alert('some error occured')
         // this.toastr.error('some error occured')

        });

    } // end condition

  } // end signinFunction



}
