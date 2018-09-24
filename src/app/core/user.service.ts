import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  public authStateChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth) {}

  getCurrentUser(): Promise<any>  {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.authStateChanged.emit(user);
          resolve(user);
        } else {
          this.authStateChanged.emit(null);
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(value): Promise<any> {
    return new Promise((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }
}
