import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { longStackSupport } from 'q';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private userService : UserService,private afAuth: AngularFireAuth, private route: ActivatedRoute) 
  {
    this.user$ = afAuth.authState;
  } 
    //login
    login()
    {
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl',returnUrl);
      this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    //login
    logout()
    {
      this.afAuth.auth.signOut();
    }
   
    //Showing or not showing links
    get appUser$() : Observable<AppUser>{
      return this.user$
      .switchMap(user => /*this.userService.get(user.uid)*/  {
          if(user) return this.userService.get(user.uid);

          return Observable.of(null);
      });
    }
}
