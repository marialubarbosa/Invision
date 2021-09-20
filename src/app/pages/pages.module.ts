import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/components/login/login.component';
import { RegisterComponent } from './home/components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { UserSpaceComponent } from './user-space/user-space.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  declarations: [HomeComponent, LoginComponent, RegisterComponent, UserSpaceComponent, PasswordResetComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
