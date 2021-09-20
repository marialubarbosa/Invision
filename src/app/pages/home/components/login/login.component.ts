import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  static show = new EventEmitter();

  constructor(public authService: AuthService,
    private notifications: NotificationsService,
    private router: Router) { }

  ngOnInit() {
  }

  goToPage(){
    LoginComponent.show.emit(false)
  }

    signIn(email, password){
    !email || !password ? this.notifications.warn("We need all data for login.") :
    password.length < 6 ? this.notifications.warn("Password must be more than six characters.") :
    this.authService.SingIn(email, password).then(
      (result => {
        if(result.code === "auth/user-not-found"){
          this.notifications.warn("This email is not in our database", "Please register")
        }else if(result.code === "auth/wrong-password"){
          this.notifications.warn("Incorrect password")
        }else if(result.errors[0].message === "INVALID_PASSWORD"){
          this.notifications.warn("Incorrect password")
        }else if(result.errors[0].message === "TOO_MANY_ATTEMPTS_TRY_LATER"){
          this.notifications.warn("Fails for many attempts", "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.")
        }
      })
    )
  }

  goToForgotPassword(){
    this.router.navigate(["password-reset"]);
  }



}
