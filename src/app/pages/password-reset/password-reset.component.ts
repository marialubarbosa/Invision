import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  constructor( public authService: AuthService,
    private notifications: NotificationsService,
    public route: Router) { }

  ngOnInit() {
  }

  forgotPassword(email){
    !email ? this.notifications.warn("Enter an email for password reset.") :
    this.notifications.warn("Password Reset","If this email is in our database, check your inbox to proceed with the password reset.")
    this.authService.ForgotPassword(email)
  }

}
