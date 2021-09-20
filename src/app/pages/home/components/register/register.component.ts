import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  static show = new EventEmitter()
  errors: any[] = [];

  constructor(public authService: AuthService,
    private notifications: NotificationsService) { }

  ngOnInit() {
  }

  goToPage(){
    RegisterComponent.show.emit(true)
  }

  signUp(email, password){
    !email || !password ? this.notifications.warn("We need all the data for registration.") :
    password.length < 6 ? this.notifications.warn("Password must be more than six characters.") :
    this.authService.SingUp(email, password).then(
       (result => {
         if(result.code === "auth/email-already-in-use"){
           this.notifications.warn("This email already exists in our database", "Please, reset your password and try to login.")
         }else if(result.code === "auth/invalid-email"){
          this.notifications.warn("This email is not valid.")
         }else{
          this.notifications.success("Registration performed")
         }
       })
    )
  }

}
