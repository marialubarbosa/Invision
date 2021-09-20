import { Component, Input, OnInit, Output } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() loginBoolean: Boolean = true

  constructor() { }

  ngOnInit() {
    RegisterComponent.show.subscribe(e => this.loginBoolean = e)
    LoginComponent.show.subscribe(e => this.loginBoolean = e)
  }

  goToPage() {
    this.loginBoolean = !this.loginBoolean;
  }

}
