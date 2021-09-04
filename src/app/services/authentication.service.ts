import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: Observable<any>;
  isSignedIn = false;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign Up */
   signUp(email: string, password: string) {
     
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed up!', res);
      this.isSignedIn = true;
    })
    .catch(error => {
      console.log('Something is wrong: ', error.message);
      this.isSignedIn = false;
    })
    return this.isSignedIn;
  }

  /* Sign in*/
  signIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed in!');
      //console.log(JSON.stringify(res));
      this.isSignedIn = true;
    })
    .catch(error => {
      console.log('Something is wrong', error.message);
      this.isSignedIn = false;
    });
    return this.isSignedIn;
  }

  signOut(){
    this.angularFireAuth.signOut()
    .then(res =>{
      console.log('Successfully signed out!')
    })
    .catch(error => {
      console.log('Something is wrong', error.message);
    })
  }
}
