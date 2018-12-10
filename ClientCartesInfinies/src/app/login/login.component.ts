import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService, public router: Router) { }

  email: string;
  password: string;
  ngOnInit() {

  }

  login() {
    this.userService.loginUser(this.email, this.password).subscribe(r => {
      localStorage.setItem('Token', r.access_token);
      this.router.navigate(['Player']);
    });
  }
}
