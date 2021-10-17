import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private router: Router) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {

  }

  onClear() {

  }

}
