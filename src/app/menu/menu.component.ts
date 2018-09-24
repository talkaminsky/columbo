import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { debug } from 'util';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user : null;

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private location : Location) { }

  ngOnInit() {
    this.userService.authStateChanged.subscribe((user) => {
      this.user = user;
    })
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }
}
