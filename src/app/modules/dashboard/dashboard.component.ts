import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Advert } from 'src/app/models/advert';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  adverts = [] as any;
  dataSource: any;
  displayedColumns: string[] = ['index','roomType', 'price', 'title', 'description', 'province', 'city','status'];
  ELEMENT_DATA: Advert[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.retrieveAdvers();
  }

  retrieveAdvers(){
    this.crudService.retieveAdverts().subscribe(response => {
      let index = 0;
      return response.map(advert => {
        index = ++index;
        const data = advert.payload.doc.data();
        const id = advert.payload.doc.id;
        const roomType = data.roomType;
        const price = data.price;
        const title = data.title;
        const description = data.description;
        const province = data.province;
        const city = data.city;
        console.log(roomType);
        this.adverts.push({index,roomType, price, title, description, province, city});
        this.dataSource = new MatTableDataSource<Advert>(this.adverts);
        this.dataSource.paginator = this.paginator;
     }) 
    });
    console.log(this.adverts);
  }
}
