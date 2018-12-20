import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public userService: UserService, public router: Router) { }

  email: string;
  password: string;
  confirmPassword: string;

  ngOnInit() {
  }

  login() {
    // Create user then when server responds login the user.
    this.userService.createUser(this.email, this.password, this.confirmPassword).subscribe(r => {
      this.userService.loginUser(this.email, this.password).subscribe(res => {
        localStorage.setItem('Token', res.access_token);

        this.router.navigate(['Player']);
      });
    });
  }
}
