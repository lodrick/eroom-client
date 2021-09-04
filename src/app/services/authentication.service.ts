import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    //this.userData = angularFireAuth.authState;
   }
}
