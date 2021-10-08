import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  idAdminUser?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  constructor(private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.email = this.authenticationService.email;
  }

}
