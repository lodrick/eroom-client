import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { MainDashboardComponent } from './layout/main-dashboard/main-dashboard.component';
import { AdminUsersComponent } from './modules/admin-users/admin-users.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { PostComponent } from './modules/post/post.component';
import { SignupComponent } from './modules/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  },
  {
    path: '',
    component: MainDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'admins',
        component: AdminUsersComponent
      },
      {
        path: 'posts',
        component: PostComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
