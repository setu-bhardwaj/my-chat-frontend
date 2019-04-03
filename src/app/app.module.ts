import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './user/login/login.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { SocketServiceService } from './socket-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChatModule,
    UserModule,
    SharedModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path : 'login',component:LoginComponent,pathMatch : 'full'},
      {path:'',redirectTo:'Login',pathMatch:'full'},
      {path:'*',component:LoginComponent},
      {path:'**',component:LoginComponent}
    ])
  ],
  providers: [AppService],
  //using SocketServiceService local to component so providers in chat comp.ts
  bootstrap: [AppComponent]
})
export class AppModule { }
