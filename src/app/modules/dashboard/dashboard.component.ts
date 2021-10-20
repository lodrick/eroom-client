import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { Advert } from 'src/app/models/advert';
import { CrudService } from 'src/app/services/crud.service';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

export enum ToggleEnum {
  APPROVED,
  PENDING,
  DECLINED
}

const APPROVED: string = "toggleEnum.APPROVED";
const PENDING: string = "toggleEnum.PENDING";
const DECLINED: string = "toggleEnum.DECLINED";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers!: string;
  registeredUsersToday!: string;
  dataSource!: MatTableDataSource<Advert>;
  displayedColumns: string[] = ['index','roomType', 'price', 'title', 'description', 'city','status','action'];
  ELEMENT_DATA: Advert[] = [];
  public unsubscribe$ = new SubSink();
  searchKey!: string;
  img!: string;

  pieChart:any = [];

  toggleEnum = ToggleEnum;
  selectedState = this.toggleEnum.DECLINED

  

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private crudService: CrudService, 
    private dataService: DataService) { }

  ngOnInit(): void 
  {
    this.pieChart = this.dataService.pieChart();
    this.retrieveAdverts();
    this.retrieveUsers();
    this.retrieveUsersByDate();
  }

  ngOnDestroy(): void 
  {
    this.unsubscribe$.unsubscribe();
  }

  retrieveAdverts() 
  {
    this.crudService.retieveAdverts().subscribe(
      list => {
        let array = list.map(item => {
          return {
            ...item.payload.doc.data()
          };
        });
        // array.forEach((e) =>{
        //   console.log(e.photosUrl[0]);
        // });
        this.dataSource = new MatTableDataSource(array.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  retrieveUsers() 
  {
    this.crudService.retrieveUsers().subscribe(
      list => {
        let array = list.map(item => {
          return {
            ...item.payload.doc.data()
          };
        });
        this.totalUsers = array.length+'K';
      }
    );
  }

  retrieveUsersByDate() 
  {
    let nu;
    this.crudService.retrieveUsersByDate(new Date()).subscribe(
      list => {
        let array = list.map(item => {
          return {
            ...item.payload.doc.data()
          }
        });
        nu = array.length? array.length : 0
        this.registeredUsersToday =  nu + 'K';
      }
    );
  }

  onSearchClear() 
  {
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter() 
  {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onToggleStatusChange($event: any, index: number, element:any) 
  {
    if($event.value == APPROVED) 
    {
      this.updateApproveStatus(index, element)
    }
    else if($event.value == PENDING) { 
      this.updatePendingStatus(index, element)
    }
    else if($event.value == DECLINED)
    {
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
}

