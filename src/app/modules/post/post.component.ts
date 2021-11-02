import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Advert } from 'src/app/models/advert';
import { CrudService } from 'src/app/services/crud.service';
import { DataService } from 'src/app/services/data.service';
import { DisplayPostImagesComponent } from '../display-post-images/display-post-images.component';

export enum ToggleEnum {
  APPROVED,
  PENDING,
  DECLINED,
}

const APPROVED: string = "toggleEnum.APPROVED";
const PENDING: string = "toggleEnum.PENDING";
const DECLINED: string = "toggleEnum.DECLINED";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  displayedColumns: string[] = ['index','imageUrl','roomType','price', 'title', 'description', 'city', 'email', 'status', 'action'];
  dataSource!: MatTableDataSource<Advert>;
  ELEMENT_DATA: Advert[] = [];
  searchKey!: string;

  toggleEnum = ToggleEnum;
  selectedState = this.toggleEnum.DECLINED;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private crudService: CrudService,
    private dataService: DataService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.retrieveAdverts();
  }

  retrieveAdverts() {
    this.crudService.retieveAdverts().subscribe(
      list => {
        let array = list.map(items => {
          return {
            ...items.payload.doc.data()
          }
        });
        this.dataSource = new MatTableDataSource(array.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onToggleStatusChange($event: any, index: number, element: any) {
    if($event.value == APPROVED) {
      this.updateApproveStatus(index, element);
    }
    else if($event.value == PENDING) {
      this.updatePendingStatus(index, element);
    }
    else if($event.value == DECLINED) {
      this.updateDeclineStatus(index, element);
    }
    this.selectedState = $event.value;
  }

  /*Status Update: Approve*/
  updateApproveStatus(index: number, element:any) 
  {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.crudService.udateAdvertStatus(element.id, 'approved');
  }

  /*Status Update: Pending*/
  updatePendingStatus(index: number, element:any)
  {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.crudService.udateAdvertStatus(element.id, 'pending');
  }

  /*Status Update: Decline*/
  updateDeclineStatus(index: number, element:any)
  {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.crudService.udateAdvertStatus(element.id, 'declined');
  }

  displayAdImages(index: number, element: any) {
    const data = this.dataSource.data;
    data.slice((this.paginator.pageIndex * this.paginator.pageIndex) + index , 1);
    
    const stringObject = JSON.stringify(element.photosUrl);
    const stringJson = JSON.parse(stringObject);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(DisplayPostImagesComponent, dialogConfig);

    this.dataService.imageUrls = [];
    stringJson.array.forEach((element: { photoUrl: string; }) => {
      this.dataService.imageUrls.push(element.photoUrl);
    });
  }

}
