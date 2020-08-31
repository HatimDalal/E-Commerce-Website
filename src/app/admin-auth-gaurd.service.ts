import { Injectable } from '@angular/core';
//import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
//import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurd implements CanActivate {

  constructor(private auth: AuthService,private userService: UserService) { }

  /*canActivate(): Observable<boolean>{
    return this.auth.user$
    .switchMap(user => {
         return this.userService.get(user.uid);
    })
    .map(appUser=> appUser.isAdmin);
  }*/

  canActivate(): Observable<boolean> {
    /*return this.auth.user$.switchMap(user => 
    this.userService.get(user.uid))*/
    return this.auth.appUser$.map/*<extra front bracket>(*/(appUser /*:any)*/ => appUser.isAdmin);
 }

}
