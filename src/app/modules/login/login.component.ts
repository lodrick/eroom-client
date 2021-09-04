import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { Auth } from 'firebase/compat/app';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  public loginInvalid: boolean = false;
  submitted = false;
  loading = false;
  private returnUrl: string ='';
  error: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  onLogin(){
    const { email, password } = this.form.value;
    this.auth.signInWithEmailAndPassword(email, password)
    .then(() => 
      this.router.navigate(['dashboard'])
    );
  }

  async onSubmit(){
    this.router.navigate(['dashboard']);
  }

}
