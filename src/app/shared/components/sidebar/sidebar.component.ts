import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  constructor(private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.uid = JSON.parse(localStorage.getItem('uid')!);
    this.email = JSON.parse(localStorage.getItem('authEmail')!);
    this.displayName = JSON.parse(localStorage.getItem('displayName')!);
    this.photoURL = JSON.parse(localStorage.getItem('photoURL')!);

  }

}
