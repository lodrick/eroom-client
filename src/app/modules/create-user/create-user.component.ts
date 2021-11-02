import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    contactNumber: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    re_password: ['', Validators.required],
  });
  

  addAdminInvalid: boolean = false;
  invalid: boolean = false;

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private crudService: CrudService,
    private router: Router) { }

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  get f(){
    return this.form.controls;
  }

  onSubmit() {
    /*let user!: User;
    user.name = this.f.name.value;
    user.surname = this.f.surname.value;
    user.contactNumber = this.f.contactNumber.value;
    user.email = this.f.email.value;
    user.password = this.f.password.value;*/

    let user: User = {
      name: this.f.name.value,
      surname: this.f.surname.value,
      contactNumber: this.f.contactNumber.value,
      email: this.f.email.value,
      password: this.f.password.value,
      idUser: '',
      country: 'South Africa',
      userType: 'admin',
      imageUrl: '',
      lastMessageTime: Date.now,
      createdAt: Date.now,
      updatedAt: Date.now,
    };
    console.log(this.f.email.value);
    this.crudService.getUsersByContactNumber("+27765062306").subscribe(
      
      list => {
        let user = list.map(item => {
          return {
            //...item.payload.doc.id,
            ...item.payload.doc.data
          }
        });
        user.forEach((s)=>{
          console.log(s);
        });
        
      }
    );
    //this.authenticationService.signUp(this.f.email.value, this.f.password.value);
    //this.crudService.createUser(user);
  }

  onClear() {

  }

}
