import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { AdminUsersComponent } from 'src/app/modules/admin-users/admin-users.component';
import { CreateUserComponent } from 'src/app/modules/create-user/create-user.component';


import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { CrudService } from 'src/app/services/crud.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule} from '@angular/material/form-field';
import { DataService } from 'src/app/services/data.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    MainDashboardComponent,
    DashboardComponent,
    AdminUsersComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatSidenavModule,
    MatButtonToggleModule,
    AngularFireAuthModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    AngularFireDatabaseModule,
  ],
  providers: [CrudService, DataService,]
  
})
export class MainDashboardModule { }
