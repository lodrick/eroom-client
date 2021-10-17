import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CrudService } from 'src/app/services/crud.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

export enum ToggleEnum {
  EDIT,
  DELETE,
  
}

const EDIT: string = "toggleEnum.EDIT";
const DELETE: string = "toggleEnum.DELETE";


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  dataSource!: MatTableDataSource<User>
  displayedColumns: string[] = ['index','name', 'surname', 'email', 'userType', 'action']
  ELEMENT_DATA: User[] = [];
  searchKey!: string;

  toggleEnum = ToggleEnum;
  selectedState = null;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort
  constructor(
    private crudService: CrudService, 
    private authenticationService: AuthenticationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  ngOnDestroy():void {}

  retrieveUsers()
  {
    this.crudService.retrieveUsersByUserType().subscribe(
      list => {
        let array = list.map(item => {
          return {
            ...item.payload.doc.data()
          }
        });
        console.log(array.length);
        this.dataSource = new MatTableDataSource(array.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  onSearchClear()
  {
    this.searchKey=""
  }

  applyFilter()
  {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.crudService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CreateUserComponent,dialogConfig);
  }

  onEdit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EditUserComponent, dialogConfig);
  }

  onToggleStatusChange($event: any, index: number, element: any) 
  {
    if($event.value == EDIT) {
      console.log('EDIT')
      this.onEdit();
    }
    else if($event.value == DELETE) { 
      console.log('DELETE')
    }
    this.selectedState = $event.value;
  }
}
