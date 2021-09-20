import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.scss']
})
export class UserSpaceComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
