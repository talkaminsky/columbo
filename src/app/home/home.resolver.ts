import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../core/user.model';

@Injectable()
export class HomeResolver implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        user.image = res.photoURL || 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png';
        user.name = res.displayName;
         return resolve(user);
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}
