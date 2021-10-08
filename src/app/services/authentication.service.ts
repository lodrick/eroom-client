import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: Observable<any>;
  isSignedIn?: boolean = false;

  idAdminUser?: string;
  displayName?: string = '';
  email?: string;
  photoURL?: string;
  
  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
    //angularFireAuth.user.subscribe
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

      this.idAdminUser = res.user?.uid!;
      this.displayName = res.user?.displayName!;
      this.email = res.user?.email!;
      this.photoURL = res.user?.photoURL!;
      
      console.log('Successfully signed in!', res);
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
