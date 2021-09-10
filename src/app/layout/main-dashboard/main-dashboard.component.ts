import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  sidebarOpen = true;

  constructor() { }

  ngOnInit(): void {
  }
  
  sidebarToggler(event: any) {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
