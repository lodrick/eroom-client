import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { Advert } from 'src/app/models/advert';
import { CrudService } from 'src/app/services/crud.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //adverts: any = [];
  dataSource!: MatTableDataSource<Advert>;
  displayedColumns: string[] = ['index','roomType', 'price', 'title', 'description', 'province', 'city','status'];
  ELEMENT_DATA: Advert[] = [];
  public unsubscribe$ = new SubSink();
  searchKey!: string;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.retieveAdverts().subscribe(
      list => {
        let array = list.map(item => {
          return {
            ...item.payload.doc.data()
          };
        });
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSearchClear() {
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  /*Status Update: Approve*/
  updateApproveStatus(index: number, element:any) {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.crudService.udateAdvertStatus(element.id, 'approved');
  }

  /*Status Update: Pending*/
  updatePendingStatus(index: number, element:any) {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.crudService.udateAdvertStatus(element.id, 'pending');
  }

  /*Status Update: Decline*/
  updateDeclineStatus(index: number, element:any) {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.crudService.udateAdvertStatus(element.id, 'decline');
  }
}
