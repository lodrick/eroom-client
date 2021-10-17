import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

}
